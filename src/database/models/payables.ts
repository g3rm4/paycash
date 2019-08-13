import {Sequelize, sequelize} from '../sequelize'

const Model = Sequelize.Model;
export class Payable extends Model {}

Payable.init({
  id: {
    type: Sequelize.INTEGER(10),
    autoIncrement: true,
    primaryKey: true
  },
  transaction_id: {
    type: Sequelize.INTEGER(10),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY(),
    allowNull: false
  },
  transaction_value: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false
  },
  transaction_fee: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false
  },
  transaction_liquid_value: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false
  },
  seller_id: {
    type: Sequelize.INTEGER(10),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'payables'
});