// Import the Sequelize DataTypes class to define the data types of the fields in the model
import {DataTypes} from "sequelize";
// Import connection to database for create tables
import {sequelize} from "../database/database.js"
// Import the Products model in relation to Categories
import {Products} from "./Products.js";
// Define the Categories model using sequelize.define()
export const Categories = sequelize.define("categories",{
    
    id:{
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true   
    },

    name: {
        type: DataTypes.STRING
    },

    size: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
},{
    timestamps: false,
});
// Establishes a one-to-many relationship between Categories and Products, where Categories has many Products
Categories.hasMany(Products,{
    foreignKey: "categoryId",
    sourceKey: "id"
})
// Establishes the membership relationship between Products and Categories, where Products belongs to a Categories
Products.belongsTo(Categories,{
    foreignKey: "categoryId",
    targetId: "id"
})