const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust based on your actual path to the database connection

// Define the Cart model
const Cart = sequelize.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // The cart must belong to a user
        references: {
            model: 'users', // Make sure 'users' matches your User model's table name
            key: 'id'
        }
    }
}, {
    timestamps: true // Add this if you want createdAt and updatedAt fields
});

module.exports = Cart;

