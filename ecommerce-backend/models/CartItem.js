const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CartItem = sequelize.define('cartItem', {
  quantity: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  },
});

module.exports = CartItem;

