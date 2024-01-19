// Import the Sequelize DataTypes class to define the data types of the fields in the model
import {DataTypes} from "sequelize";
// Import connection to database for create tables
import {sequelize} from "../database/database.js";
// Define the Products model using sequelize.define()
export const Products = sequelize.define("products",{
    id:{
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true   
    },

    name: {
        type: DataTypes.STRING
    },

    description:{
        type: DataTypes.STRING
    },

    src:{
        type: DataTypes.STRING
    },

    price:{
        type: DataTypes.INTEGER
    },

    off: {
        type: DataTypes.STRING,
        defaultValue: ""
    }
}
,{
    timestamps: false,
});