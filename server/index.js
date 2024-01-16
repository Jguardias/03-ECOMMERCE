import  app from "./app.js";
import {sequelize} from "./src/database/database.js";




async function main(){

    try {     
        await sequelize.sync({force: false, logging: false});
        app.listen(3000);
        console.log("sever 3000");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


main();