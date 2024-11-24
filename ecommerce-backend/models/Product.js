const Sequelize = require('sequelize');
const sequelize = require('../database');  // Import the Sequelize instance

const Product = sequelize.define('product', {
  name: { type: Sequelize.STRING, allowNull: true },
  price: { type: Sequelize.FLOAT, allowNull: true },
  stock: { type: Sequelize.INTEGER, allowNull: true },
  description: { type: Sequelize.TEXT, allowNull: true }, // Add description field
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
});

module.exports = Product;

