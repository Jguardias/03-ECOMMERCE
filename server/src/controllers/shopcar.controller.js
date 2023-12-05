import {ShopCar} from "../models/ShopCar.js"


export const getProductCar = async (req, res)=>{

    try {
        const categories = await ShopCar.findAll()
        console.log(categories)
        res.json(categories);
    } catch (error) {
         return res.status(500).json({message: error.message})
    }

}

export const createProductCar = async (req, res)=>{
    const {name} = req.body;
    try {
        const newCategory = await  ShopCar.create({
            name: name,
        });
        res.json(newCategory);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateProductCar = async (req, res)=>{

    try {
        const {id} = req.params;
        const {name} = req.body;
        const category = await  ShopCar.findByPk(id);
    
        category.name = name;
    
        await category.save()
        res.json(category); 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const deleteProductCar = async (req, res)=>{
    
    try {
        const {id} = req.params;
        await  ShopCar.destroy({
            where:{
                id,
            }
        });
        res.sendStatus(204); 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

