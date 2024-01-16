import {Router} from "express"
import  upload from "../services/multerConfig.js"
import {getProducts,createProduct,deleteProduct,updateProduct,getProduct} from "../controllers/products.controller.js"


const router = Router()

router.get("/products", getProducts) ;
router.post("/products", upload.single("image") ,createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id",deleteProduct);
router.get("/products/:id",getProduct);



export default router