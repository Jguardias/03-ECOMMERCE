import Sequelize from "sequelize";

 export const sequelize = new Sequelize("dbEcommerce", "postgres", "ysoloSEqv19%", {
    host: "localhost",
    dialect: "postgres"
});


