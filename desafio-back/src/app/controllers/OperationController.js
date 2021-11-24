import File from '../models/File';
import Operation from '../models/Operation';
import Store from '../models/Store';
import OperationType from '../models/OperationType';
import { readFileSync } from 'fs';
import sequelize from 'sequelize';
import Database from '../../database';

class OperationController {
  async index(req, res) {
    let offset = 0;

    if (req.query.count && req.query.page) {
      offset = req.query.count * req.query.page - req.query.count;
    }

    let where = {};

    if (req.query.store) {
      where.store_id = req.query.store;
    }
    
    const [operations, total] = await Promise.all([
      Operation.findAll({        
        order: ['store_id'],   
        include: [
          {
            model: Store,
            as: 'store'
          }
        ],     
        where,
        limit: req.query.count,
        offset,
      }),
      Operation.findOne({
        attributes: [
          sequelize.fn('sum', sequelize.col('value'))
        ],
        where,
        raw: true
      })
    ]);
    return res.json({
      operations,
      total
    });
  }

  async store(req, res) {
    if (!req.file) {
      return res.json();
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    const fileData = await readFileSync(req.file.path);
    const operationsList = fileData.toString().split('\n');
    const normalizedArray = operationsList.map(item => { 
      const operationItem = {
        type: parseInt(item.substring(0, 1)),
        date: item.substring(1, 9),
        value: parseFloat(item.substring(9, 19)) / 100,
        cpf: item.substring(19, 30),
        card: item.substring(30, 42),
        hour: item.substring(42, 48),
        owner: item.substring(48, 62).trim(),
        store: item.substring(62, 81).trim()
      }
      const type = OperationType.get(operationItem.type);
      
      if (!type?.sum) {
        operationItem.value = operationItem.value * -1;
      }

      return operationItem;
    }).filter(item => item.store);

    const stores = [];

    normalizedArray.forEach((item) => {
      const store = stores.find(store => store.owner == item.owner)
      if (!store) {
        stores.push({
          owner: item.owner,
          store: item.store,
          operations: [item]          
        });
      }else store.operations.push(item)
    })

    const transaction = await Database.startTransaction();
    try {     

      await Store.destroy({
        truncate: true,
        cascade: true,
        transaction
      });    

      const storedStores = await Store.bulkCreate(stores, {
        transaction
      });

      await Promise.all(storedStores.map(async (store) => {
        const storeOperations = stores.find(item => item.owner == store.owner);

        if (storeOperations?.operations) {
          storeOperations.operations.forEach(operation => {
            operation.store_id = store.id;
          })
          await Operation.bulkCreate(storeOperations.operations, {
            transaction
          });
        }
      }));

      await transaction.commit();       
  
      return res.json(file);
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(500).json(error);
    }    
  }
}

export default new OperationController();
