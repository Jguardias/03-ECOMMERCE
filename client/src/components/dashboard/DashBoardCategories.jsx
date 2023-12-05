// import hooks of react
import { useEffect, useState } from "react";
//import icons for App from ReactIcons
import { MdDeleteForever } from "react-icons/md";
//import methods of API for consume apiREST (categories)
import {getCategories,createCategory, deleteCategory} from "../../api/apiRequests";
//import styles module for App DashBoardCategories component
import styles from "../../styles/DashBoard.module.css";

function Categories() {
  // state for store list of categories
  const [category, setCategory] = useState([]);
  // state for store value inputs form  of  new category
  const [newCategory, setNewCategory] = useState({
    name: "",
    size: "",
    title: "",
  });

  useEffect(() => {
    // call getCategories asynchronous function to get list of categories from db
    getCategories().then((data) => setCategory(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

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

  const handleDelete = (productId) => {
    deleteCategory(productId)
      .then(() => {
        getCategories().then((data) => setCategory(data));
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
      });
  };

  return (
    <div className={styles.dashBoardProduct}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleChange}
          placeholder="nombre categoria"
        />
        <input
          type="text"
          name="size"
          value={newCategory.size}
          onChange={handleChange}
          placeholder="Cantidad de productos"
        />
        <input
          type="text"
          name="title"
          value={newCategory.title}
          onChange={handleChange}
          placeholder="Titulo Categoria"
        />
        <button className={styles.crear} type="submit">
          Enviar
        </button>
      </form>

      <h2>Clasificación de categorias</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Categoria</th>
            <th>Cantidad de productos</th>
            <th>Titulo de categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {category.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>{producto.size}</td>
              <td>{producto.title}</td>
              <td>
                <button
                  className={styles.eliminar}
                  onClick={() => {
                    handleDelete(producto.id);
                  }}
                >
                  Eliminar
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// export component card for use in DashBoard component 
export default Categories;
