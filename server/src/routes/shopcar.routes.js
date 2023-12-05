import {Router} from "express"
import {getProductCar,deleteProductCar,createProductCar,updateProductCar} from "../controllers/shopcar.controller.js"

const router = Router()

router.get("/shopCarProduct", getProductCar) ;
router.post("/shopCarProduct", createProductCar);
router.put("/shopCarProduct/:id", updateProductCar);
router.delete("/shopCarProduct/:id",deleteProductCar);


export default router