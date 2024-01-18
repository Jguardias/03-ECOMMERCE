// import Sequelize, the object-relational mapping (ORM) library for databases
import Sequelize from "sequelize";
// Import the dotenv library to load environment variables from the .env file
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
// Sequelize instance for database connection
 export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    // Connection configuration
    host: process.env.DB_HOST, // Database server address
    dialect: process.env.DB_DIALECT // Type of database we are using (in this case, PostgreSQL)
});


