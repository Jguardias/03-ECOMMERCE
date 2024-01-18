// Import router from Express
import { Router } from "express";
// Import specific handlers for category CRUD operations
import {
    getCategories,
    createCategories,
    deleteCategories,
    updateCategories,
    getCategoriesProducts
  } from "../controllers/categories.controller.js";
// Create an Express router instance
const router = Router() 
// CRUD routes for categories
router.get("/categories", getCategories) ;
router.post("/categories", createCategories);
router.put("/categories/:id", updateCategories);
router.delete("/categories/:id",deleteCategories);
router.get("/categories/:id");
router.get("/categories/:id/products",getCategoriesProducts);
//Export router
export default router;