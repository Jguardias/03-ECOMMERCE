import {Products} from "../models/Products.js"
import saveImage from "../services/renameImage.js"

export const getProducts = async (req, res) =>{
    try {
       const products = await Products.findAll();
       console.log(products)
       res.json(products)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createProduct = async(req, res) =>{
    try {
       const {name,description,src,price,off,categoryId}  = req.body;
       const  newProduct = await Products.create(
        {
            name,
            description,
            src,
            price,
            off,
            categoryId
        }
       );
       console.log(req.file);
       saveImage(req.file)
       res.json(newProduct)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const deleteProduct = async (req, res) =>{
     const {id} = req.params
    try {
       const result=  await Products.destroy({
            where: {id}
        });
        // console.log(result);
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateProduct = async (req, res) =>{
    
    try {
        const {id} = req.params;
       const product = await Products.findOne({
            where: {id}
        });
        product.set(req.body);
        await product.save();
        return res.json(product)

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


export const getProduct = async (req, res) =>{
    const {id} = req.params;
    try {

      const product = await Products.findOne({
        where: {id}
      });

      res.json(product);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


