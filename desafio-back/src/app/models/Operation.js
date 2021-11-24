import Sequelize, { Model } from 'sequelize';
import OperationType from './OperationType';

class Operation extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.INTEGER,
        typeDesc: {
          type: Sequelize.VIRTUAL,
          get() {
            return OperationType.get(this.type)
          }
        },
        date: Sequelize.DATEONLY,
        hour: Sequelize.INTEGER,
        value: Sequelize.DOUBLE,
        cpf: Sequelize.STRING,
        card: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,        
      },
      {
        sequelize,
      }
    );   
    
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Store, {
      foreignKey: 'store_id',
      as: 'store',
    })
  }
}

export default Operation;
