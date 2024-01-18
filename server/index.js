//Import obj App from App.js
import app from "./src/app.js";
//Import instance of Sequelize (ORM) for interact with to bd
import { sequelize } from "./src/database/database.js";
// Import the dotenv library to load environment variables from the .env file
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// Use the port provided by the environment or 3000 as the default value.
const PORT = process.env.PORT || 3000;
//asynchronous function that initializes the server and synchronizes the database
async function main() {
  try {
    // synchronize the database, preventing table recreation (force: false) and disabling logging (logging: false)
    await sequelize.sync({ force: false, logging: false });
    // We start the application, listening on port 3000
    app.listen(PORT);
    // We print a message in the console indicating that the server is listening on port 3000
    console.log("Server listening on port:", PORT);
  } catch (error) {
    // In case of error, we print an error message to the console
    console.error('Could not connect to database:', error);
  }
}

// We call the 'main' function to start server and database
main();