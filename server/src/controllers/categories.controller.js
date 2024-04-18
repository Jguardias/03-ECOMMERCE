// Import the Categories and Products models
import { Categories } from "../models/Categories.js"
import { Products } from "../models/Products.js";

// Get all categories
export const getCategories = async (req, res) => {
    try {
        //Query all categories in the database
        const categories = await Categories.findAll()
        // Send the categories as a response in JSON format
        res.json(categories);
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({ message: error.message })
    }
}

export const getCategory = async (req, res) => {

    const { id } = req.params;
    try {
        const category = await Categories.findOne({
            where: { id }
        });

        res.json(category);
    } catch {
        return res.status(500).json({ message: error.message });
    }
}
// Create a new category
export const createCategories = async (req, res) => {
    // Extract data from the request body
    const { name, size, title } = req.body;
    try {
        // Create a new category in the database
        const newCategory = await Categories.create({
            name,
            size,
            title
        });
        // Send the new category as a response in JSON format
        res.json(newCategory);
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({ message: error.message })
    }

}
// Update an existing category by ID
export const updateCategories = async (req, res) => {
    try {
        // Get the category ID and new data from the parameters and request body
        const { id } = req.params;
        const { name, size, title } = req.body;
        // Search the category by ID in the database
        const category = await Categories.findByPk(id);
        // Update the category data with the new values
        category.name = name;
        category.size = size;
        category.title = title;
        // Save changes to the database
        await category.save()
        // Send the updated category as a response in JSON format
        res.json(category);
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({ message: error.message })
    }

}
// Delete a category by ID
export const deleteCategories = async (req, res) => {
    try {
        // Get the category ID from the request parameters
        const { id } = req.params;
        // Delete the category from the database
        await Categories.destroy({
            where: {
                id,
            }
        });
        // Send a 204 status code (no content) as a response
        res.sendStatus(204);
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({ message: error.message })
    }

}
// Get all products associated with a category by their ID
export const getCategoriesProducts = async (req, res) => {
    // Get the category ID from the request parameters
    const { id } = req.params;
    try {
        // Query all products associated with the category in the database
        const products = await Products.findAll(
            {
                where: { categoryId: id }
            }
        )
        // Send the products as a response in JSON format
        res.json(products)
    } catch (error) {
        //Handle errors and send a 500 status code on error
        return res.status(500).json({ message: error.message })
    }
}