import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Operation from '../app/models/Operation';
import Store from '../app/models/Store';

import databaseConfig from '../config/database';

const models = [
  User,
  File,
  Store,
  Operation
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);    

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  async startTransaction() {
    return this.connection.transaction();
  }
}

export default new Database();
