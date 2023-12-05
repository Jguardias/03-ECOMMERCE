import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../api/apiRequests";
import styles from "../../styles/DashBoard.module.css";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

function Products() {
  const [productos, setProductos] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    src: "",
    price: 0,
    off: "",
    categoryId: 0,
  });

  useEffect(() => {
    getProducts().then((data) => setProductos(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("src", newProduct.src);
    formData.append("price", newProduct.price);
    formData.append("off", newProduct.off);
    formData.append("categoryId", newProduct.categoryId);
    formData.append("image", e.target.querySelector('[name="image"]').files[0]);
    console.log(formData);

    createProduct(formData)
      .then(() => {
        getProducts().then((data) => setProductos(data));
      })
      .catch((error) => {
        console.error("Error al agregar producto:", error);
      });
  };

  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then(() => {
        getProducts().then((data) => setProductos(data));
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
      });
  };

  return (
    <div className={styles.dashBoardProduct}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="nombre producto"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="descripcion producto"
        />
        <input
          type="text"
          name="src"
          value={newProduct.src}
          onChange={handleChange}
          placeholder="url imagen producto"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="precio producto"
        />
        <input
          type="text"
          name="off"
          value={newProduct.off}
          onChange={handleChange}
          placeholder="descuento producto"
        />
        <input
          type="number"
          name="categoryId"
          value={newProduct.categoryId}
          onChange={handleChange}
          placeholder="categoria del  producto"
        />
        <input name="image" type="file" />
        <button className={styles.crear} type="submit">
          Enviar
        </button>
      </form>

      <h2>Listado de productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Dirección URL</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>{producto.description}</td>
              <td>{producto.src}</td>
              <td>{producto.price}</td>
              <td>{producto.off}</td>
              <td>{producto.categoryId}</td>
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

export default Products;
