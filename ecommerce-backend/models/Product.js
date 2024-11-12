const Sequelize = require('sequelize');
const sequelize = require('../database');  // Import the Sequelize instance

const Product = sequelize.define('product', {
  name: { type: Sequelize.STRING },
  price: { type: Sequelize.FLOAT },
  stock: { type: Sequelize.INTEGER }
});

module.exports = Product;

