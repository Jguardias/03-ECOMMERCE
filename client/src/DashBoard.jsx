//import dependencies of react 
import { Routes, Route} from "react-router-dom";
//import components for Dashboard component  
import Products from "./components/dashboard/Products.jsx";
import Categories from "./components/dashboard/Categories.jsx";
import Home from "./components/dashboard/Home.jsx"
import DefaultComponent from "./components/dashboard/DashBoardDefault.jsx";
import DashBoardHeader from "./components/dashboard/Header.jsx"
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
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/shopCars" element={<DefaultComponent />} />
        <Route path="/systemOrders" element={<DefaultComponent />} />
      </Routes>
    </div>
  );
}

export default DashBoard;
