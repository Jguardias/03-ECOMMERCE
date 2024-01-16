import  express  from "express";
import cors from "cors";

import { fileURLToPath } from 'url';
import { dirname } from 'path'; 
import path from 'path';

import categoriesRoutes from "./src/routes/categories.routes.js"
import productsRouter from "./src/routes/products.routes.js"
import shopCarRouter from "./src/routes/shopcar.routes.js"
import systemOrderRouter from "./src/routes/systemorder.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


  app.use('/uploads', express.static(path.join(__dirname,'src' ,'uploads')));
  
app.use(cors())
app.use(express.json())
app.use(categoriesRoutes);
app.use(productsRouter);
app.use(shopCarRouter);
app.use(systemOrderRouter);

export default app