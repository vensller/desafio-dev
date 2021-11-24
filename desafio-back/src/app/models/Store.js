import Sequelize, { Model } from 'sequelize';

class Store extends Model {
  static init(sequelize) {
    super.init(
      {        
        owner: Sequelize.STRING,
        store: Sequelize.STRING,
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
    this.hasMany(models.Operation, {
      foreignKey: 'id',
      as: 'operations',
    })
  }

}

export default Store;
