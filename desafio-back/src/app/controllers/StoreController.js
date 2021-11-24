import Store from '../models/Store';

class OperationController {
  async index(req, res) {
      
    const stores = await Store.findAll({        
        order: ['id'],   
    });

    return res.json(stores);
  }
}

export default new OperationController();
