import {DataTypes} from "sequelize"
import {sequelize} from "../database/database.js"

export const ShopCar = sequelize.define("shopcar",{
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
