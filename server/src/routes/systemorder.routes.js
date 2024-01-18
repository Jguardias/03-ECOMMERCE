// Import router from Express
import {Router} from "express"
// Import specific handlers for systemorder CRUD operations
import {getProductOrder,deleteProductOrder,createProductOrder,updateProductOrder} from "../controllers/systemorder.controller.js"
// Create an Express router instance
const router = Router()
// CRUD routes for systemorder
router.get("/systemOrder", getProductOrder) ;
router.post("/systemOrder", createProductOrder);
router.put("/systemOrder/:id", updateProductOrder);
router.delete("/systemOrder/:id",deleteProductOrder);
//Export router
export default router