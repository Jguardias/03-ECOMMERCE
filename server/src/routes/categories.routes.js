import { Router } from "express";
import {getCategories,createCategories,deleteCategories,updateCategories,getCategoriesProducts} from "../controllers/categories.controller.js"



 const router = Router() 

router.get("/categories", getCategories) ;
router.post("/categories", createCategories);
router.put("/categories/:id", updateCategories);
router.delete("/categories/:id",deleteCategories);
router.get("/categories/:id");
router.get("/categories/:id/products",getCategoriesProducts);


export default router;