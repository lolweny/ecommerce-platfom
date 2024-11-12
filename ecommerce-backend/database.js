const { Sequelize } = require('sequelize');

// Retry logic
const maxRetries = 5; // Max retries for the database connection
const retryInterval = 5000; // Retry interval in milliseconds (5 seconds)

async function connectWithRetry(sequelize) {
  let retries = maxRetries;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      break; // Exit the loop if the connection is successful
    } catch (error) {
      retries -= 1;
      console.error(`Database connection failed. Retrying in ${retryInterval / 1000} seconds...`);
      console.error(`Retries left: ${retries}`);
      if (retries === 0) {
        console.error('All retries failed. Exiting...');
        throw error; // Throw error after max retries
      }
      await new Promise((resolve) => setTimeout(resolve, retryInterval)); // Wait before retrying
    }
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce',         // Database name
  process.env.DB_USER || 'root',             // Database username
  process.env.DB_PASSWORD || 'password',     // Database password
  {
    host: process.env.DB_HOST || 'db',       // Use 'db' as the host when running in Docker
    port: process.env.DB_PORT || 3306,       // Default MySQL port
    dialect: process.env.DB_DIALECT || 'mysql', // Dialect for the database
    logging: console.log,                    // Enable logging for debugging (optional)
  }
);

// Attempt to connect with retries
connectWithRetry(sequelize);

module.exports = sequelize;

