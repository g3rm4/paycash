import {Sequelize, sequelize} from '../sequelize'

const Model = Sequelize.Model;
export class Transaction extends Model {}

Transaction.init({
  id: {
    type: Sequelize.INTEGER(10),
    autoIncrement: true,
    primaryKey: true
  },
  value: {
    type: Sequelize.FLOAT(6,2),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  payment_method: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  last_four_card_numbers: {
    type: Sequelize.INTEGER(4),
    allowNull: false
  },
  card_owner_name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  card_expiration: {
    type: Sequelize.STRING(5),
    allowNull: false
  },
  cvv: {
    type: Sequelize.INTEGER(7),
    allowNull: false
  },
  seller_id: {
    type: Sequelize.INTEGER(10),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'transactions'
});