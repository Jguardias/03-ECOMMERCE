// Import of necessary modules
import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
//import Routes 
import categoriesRoutes from "./routes/categories.routes.js"
import productsRouter from "./routes/products.routes.js"
import shopCarRouter from "./routes/shopcar.routes.js"
import systemOrderRouter from "./routes/systemorder.routes.js"
// Get the file name and current directory of the file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Create an Express instance
const app = express()
// Configuring CORS to allow requests from http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  headers: 'Origin, X-Requested-With, Content-Type, Accept'
}));
// Configuration so that Express can parse JSON in requests
app.use(express.json())
// Configuring middleware to serve static files from '/uploads' path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Setting up application routes
app.use(categoriesRoutes);
app.use(productsRouter);
app.use(shopCarRouter);
app.use(systemOrderRouter);
// Export the configured Express instance
export default app;
