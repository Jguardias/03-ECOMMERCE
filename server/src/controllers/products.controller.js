import {Products} from "../models/Products.js"
import renameImage from "../services/renameImage.js"

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
       const {name,description,price,off,categoryId}  = req.body;
    
         renameImage(req.file)
      
        const url = `http://localhost:3000/uploads/${req.file.originalname}`;

       const  newProduct = await Products.create(
        {
            name,
            description,
            src: url,
            price,
            off,
            categoryId
        }
       );
       

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


