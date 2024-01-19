// Import the Products model and the renameImage function
import {Products} from "../models/Products.js"
import renameImage from "../services/renameImage.js"

// Get all products
export const getProducts = async (req, res) =>{
    try {
        // Query all products in the database
       const products = await Products.findAll();
       // Send the products as a response in JSON format
       res.json(products)
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({message: error.message});
    }
};
// Create a new product
export const createProduct = async(req, res) =>{
    try {
        // Extract data from the request body
       const {name,description,price,off,categoryId}  = req.body;
        // Rename Path the file 
       renameImage(req.file)
        // Create the URL of the new image
       const url = `http://localhost:3000/uploads/${req.file.originalname}`;
        // Create a new product in the database
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
       // Send the new product as a response in JSON format
       res.json(newProduct)
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({message: error.message});
    }
}
// Delete a product by ID
export const deleteProduct = async (req, res) =>{
    // Get the product ID from the request parameters
     const {id} = req.params
    try {
        // Delete the product from the database
        await Products.destroy({
            where: {id}
        });
       // Send a 204 status code (no content) as a response
        return res.sendStatus(204);
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({message: error.message});
    }
};
// Update a product by ID
export const updateProduct = async (req, res) =>{
    try {
        // Get the product ID  from the parameters 
        const {id} = req.params;
       // Search the product by ID in the database
        const product = await Products.findOne({
            where: {id}
        });
        // Set the new product data
        product.set(req.body);
        // Save changes to the database
        await product.save();
        // Send the updated product as a response in JSON format
        return res.json(product)
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({message: error.message});
    }
};

// Get a product by ID
export const getProduct = async (req, res) =>{
    // Get the product ID  from the parameters 
    const {id} = req.params;
    try {
      // Search the product by ID in the database  
      const product = await Products.findOne({
        where: {id}
      });
      // Send the product as a response in JSON format
      res.json(product);
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({message: error.message});
    }
};


