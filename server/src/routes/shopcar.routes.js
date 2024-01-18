// Import router from Express
import {Router} from "express";
// Import specific handlers for shopcar CRUD operations
import {getProductCar,deleteProductCar,createProductCar,updateProductCar} from "../controllers/shopcar.controller.js";
// Create an Express router instance
const router = Router()
// CRUD routes for shopcar
router.get("/shopCarProduct", getProductCar) ;
router.post("/shopCarProduct", createProductCar);
router.put("/shopCarProduct/:id", updateProductCar);
router.delete("/shopCarProduct/:id",deleteProductCar);
//Export router
export default router