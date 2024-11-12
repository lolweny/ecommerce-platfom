const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {  // Use singular model name 'Order'
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  },
}, {
  tableName: 'orders',  // Explicitly set table name to 'orders'
  timestamps: true,     // Adds `createdAt` and `updatedAt` fields automatically
});

module.exports = Order;

