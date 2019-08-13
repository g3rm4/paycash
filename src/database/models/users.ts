import {Sequelize, sequelize} from '../sequelize'

const Model = Sequelize.Model;
export class User extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER(10),
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'users'
});