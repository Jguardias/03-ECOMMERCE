//import dependencies of react 
import { Routes, Route, Link } from "react-router-dom";
//import components for Dashboard component  
import Products from "./components/dashboard/DashBoardProducts.jsx";
import Categories from "./components/dashboard/DashBoardCategories.jsx";
import DefaultComponent from "./components/dashboard/DashBoardDefault.jsx";
//import icons for App from ReactIcons 
import { TbCategory } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { MdOutlineSettingsSystemDaydream } from "react-icons/md";
//import styles module for DashBoard component
import styles from "./styles/DashBoard.module.css";

function DashBoard() {
  //Dashboard component join component Categories,products, defaultComponent  for CRUD of products, categories,etc.
  return (
    <div className={styles.container}>
      {/* menu SPA for navegation in dashboard */ }
      <nav className={styles.container__main}>
        {/* name resturant */ }
      <h3>El Arepa&apos;o</h3>
        <ul className={styles.container__main__overflow}>
          {/* CRUD Categories */ }
          <li>
            <Link to="/DashBoard" className={styles.container__main__overflow__link} >
              <TbCategory />
              Categorias 
            </Link>
          </li>
           {/* CRUD Products */ }
          <li>
            <Link to="/DashBoard/products" className={styles.container__main__overflow__link}>
              <MdProductionQuantityLimits />
              Productos
            </Link>
          </li>
          <li>
            <Link to="/DashBoard/shopCars" className={styles.container__main__overflow__link}>
              <FaShoppingBag />
              Carrito de compras
            </Link>
          </li>
          {/* CRUD System orders */ }
          <li>
            <Link to="/DashBoard/systemOrders" className={styles.container__main__overflow__link} >
              <MdOutlineSettingsSystemDaydream />
              Sistema de Ordenes
            </Link>
          </li>
        </ul>
      </nav>
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
