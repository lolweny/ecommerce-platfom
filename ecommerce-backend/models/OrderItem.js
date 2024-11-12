const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const OrderItem = sequelize.define('OrderItem', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',  // 'orders' should match the table name in your database
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',  // 'products' should match the table name in your database
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,  // Default quantity is 1, can be customized as needed
  },
}, {});

module.exports = OrderItem;

