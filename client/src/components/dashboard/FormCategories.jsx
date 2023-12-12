// import hooks of react
import { useState,} from "react";
//import methods of API for consume apiREST (categories)
import {getCategories,createCategory} from "../../api/apiRequests";
//import styles module for App DashBoardCategories component
import styles from "../../styles/DashBoard.module.css";

function FormCategories(){

    // state for store list of categories
    const [category, setCategory] = useState([]);
    
    // state for store value inputs form  of  new category
    const [newCategory, setNewCategory] = useState({
      name: "",
      size: "",
      title: "",
    });

    //function to detect changes in input fields
    const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    };

   //function for submit information category to the db
   const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(newCategory)
      .then(() => {
        getCategories().then((data) => setCategory(data));
      })
      .catch((error) => {
        console.error("Error al agregar producto:", error);
      });
   };
    return (
     <>
       {/* Form category for submit new category to db  */}
       <form onSubmit={handleSubmit} >
        <div className={styles.inputForm}>
        <label htmlFor="name"><strong>Nombre de la categoria</strong></label>
        <input type="text" name="name" value={newCategory.name} onChange={handleChange} placeholder="Ej: HAMGURGUESA"/>
        </div>
        
        <div className={styles.inputForm}>
        <label htmlFor="size"><strong>Número de productos</strong></label>
        <input type="text" name="size" value={newCategory.size} onChange={handleChange} placeholder="Ej: 5 productos" />
        </div>

        <div className={styles.inputForm}>
        <label htmlFor="name"><strong>Titulo de la categoria</strong></label>
        <input type="text" name="title" value={newCategory.title}  onChange={handleChange} placeholder="Ej: ¡No te pierdas nuestras promociones de última hora!" />
        </div>

        <button className={styles.btnAdd} type="submit">Añadir categoria</button>

      </form>
     </>
    ); 
}

// export  FormCategories component for use in Categories component 
export default FormCategories;