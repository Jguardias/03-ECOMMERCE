import {DataTypes} from "sequelize"
import {sequelize} from "../database/database.js"
import {Products} from "./Products.js";

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

Categories.hasMany(Products,{
    foreignKey: "categoryId",
    sourceKey: "id"
})

Products.belongsTo(Categories,{
    foreignKey: "categoryId",
    targetId: "id"
})