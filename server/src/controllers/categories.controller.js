import {Categories} from "../models/Categories.js"
import { Products } from "../models/Products.js";

export const getCategories = async (req, res)=>{

    try {
        const categories = await Categories.findAll()
        console.log(categories)
        res.json(categories);
    } catch (error) {
         return res.status(500).json({message: error.message})
    }

}

export const createCategories = async (req, res)=>{
    const {name,size,title} = req.body;
    try {
        const newCategory = await Categories.create({
            name,
            size,
            title
        });
        res.json(newCategory);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const updateCategories = async (req, res)=>{

    try {
        const {id} = req.params;
        const {name} = req.body;
        const category = await Categories.findByPk(id);
    
        category.name = name;
    
        await category.save()
        res.json(category); 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const deleteCategories = async (req, res)=>{
    
    try {
        const {id} = req.params;
        await Categories.destroy({
            where:{
                id,
            }
        });
        res.sendStatus(204); 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const getCategoriesProducts = async (req, res)=>{
    const {id} = req.params;
    try {
        const products = await Products.findAll(
            {
             where:{categoryId: id}
            }
        )
        res.json(products)
    } catch (error) {
         return res.status(500).json({message: error.message})
    }

}