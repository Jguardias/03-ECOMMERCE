import {SystemOrder} from "../models/SystemOrder.js"


export const getProductOrder = async (req, res)=>{

    try {
        const categories = await SystemOrder.findAll()
        console.log(categories)
        res.json(categories);
    } catch (error) {
         return res.status(500).json({message: error.message})
    }

}

export const createProductOrder = async (req, res)=>{
    const {name} = req.body;
    try {
        const newCategory = await  SystemOrder.create({
            name: name,
        });
        res.json(newCategory);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateProductOrder = async (req, res)=>{

    try {
        const {id} = req.params;
        const {name} = req.body;
        const category = await  SystemOrder.findByPk(id);
    
        category.name = name;
    
        await category.save()
        res.json(category); 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const deleteProductOrder = async (req, res)=>{
    
    try {
        const {id} = req.params;
        await  SystemOrder.destroy({
            where:{
                id,
            }
        });
        res.sendStatus(204); 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

