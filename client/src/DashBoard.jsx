//import dependencies of react 
import { Routes, Route} from "react-router-dom";
//import components for Dashboard component  
import Products from "./components/dashboard/DashBoardProducts.jsx";
import Categories from "./components/dashboard/DashBoardCategories.jsx";
import DefaultComponent from "./components/dashboard/DashBoardDefault.jsx";
import DashBoardHeader from "./components/dashboard/DashBoardHeader.jsx"
//import styles module for DashBoard component
import styles from "./styles/DashBoard.module.css";

function DashBoard() {
  //Dashboard component join component Categories,products, defaultComponent  for CRUD of products, categories,etc.
  return (
    <div className={styles.container}>
        {/* menu SPA for navegation in dashboard */ }
      <DashBoardHeader/>
    
      {/*Navegation routes for rendering components of DashBoard*/}
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shopCars" element={<DefaultComponent />} />
        <Route path="/systemOrders" element={<DefaultComponent />} />
      </Routes>
    </div>
  );
}

export default DashBoard;
