// Import router from Express
import {Router} from "express"

import  upload from "../services/multerConfig.js"
// Import specific handlers for products CRUD operations
import {getProducts,createProduct,deleteProduct,updateProduct,getProduct} from "../controllers/products.controller.js"

// Create an Express router instance
const router = Router()
// CRUD routes for products
router.get("/products", getProducts) ;
router.post("/products", upload.single("image") ,createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id",deleteProduct);
router.get("/products/:id",getProduct);


//Export router
export default router