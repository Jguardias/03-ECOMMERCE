import {Router} from "express"
import {getProductOrder,deleteProductOrder,createProductOrder,updateProductOrder} from "../controllers/systemorder.controller.js"

const router = Router()

router.get("/systemOrder", getProductOrder) ;
router.post("/systemOrder", createProductOrder);
router.put("/systemOrder/:id", updateProductOrder);
router.delete("/systemOrder/:id",deleteProductOrder);


export default router