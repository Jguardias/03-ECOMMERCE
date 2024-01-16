// import hooks of react
import { useEffect, useState } from "react";
//import HomeCard components
import HomeCard from "./HomeCard";
//import methods of API for consume apiREST (getCategories and getProducts)
import { getCategories,getProducts } from "../../api/apiRequests";
//import styles module for Home component
import styles from "../../styles/DashBoard.module.css";


function Home(){

    // state for store list of categories
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // call getCategories asynchronous function to get list of categories from db
        getCategories().then((data) => setCategory(data));
        getProducts().then((data) => setProducts(data));    
        }, []);


    return(
        
        <div className={styles.containerHome} >
            {/*HomeCard components display size of category,products*/}
            <HomeCard color="#2196f3" value={category.length} title={"Categorias"}/>
            <HomeCard color="#f44336" value={products.length} title={"Productos"}/>
            <HomeCard color="#4caf50" value={"0"} title={"Ordenes"}/>
            <HomeCard color="#ffc107" value={"3"} title={"Sliders"}/>
        </div>
        
    );
}

// export  Home  component for use in DashBoard component 
export default Home;