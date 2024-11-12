const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Define the User model
const User = sequelize.define('user', {
  username: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false,
    validate: {
      isEmail: true,  // Validates that the string is an email
    },
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false // Password cannot be null
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields

  hooks: {
    // Hook to hash password before creating a user
    beforeCreate: async (user) => {
      // Hash the password only if it's not already hashed
      user.password = await bcrypt.hash(user.password, 10); // Hash password before saving
    },
    // Hook to hash password before updating the user, if the password is changed
    beforeUpdate: async (user) => {
      // Only hash the password if it has been changed
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10); // Hash password before updating if changed
      }
    }
  }
});

// Export the User model so it can be used in other parts of the project
module.exports = User;

