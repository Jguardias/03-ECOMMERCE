// import hooks of react
import { useEffect, useState } from "react";
//import icons for App from ReactIcons
import { MdDeleteForever } from "react-icons/md";
//import methods of API for consume apiREST (products)
import {getProducts,createProduct,deleteProduct} from "../../api/apiRequests";
//import styles module for App DashBoardProducts component
import styles from "../../styles/DashBoard.module.css";



function Products() {
  // state for store list of products
  const [products, setProducts] = useState([]);
 // state for store value inputs form  of  new products
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    src: "",
    price: 0,
    off: "",
    categoryId: 0,
  });

  useEffect(() => {
    // call getProducts asynchronous function to get list of products from db
    getProducts().then((data) => setProducts(data));
  }, []);

  //function to detect changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
 //function for submit information category to the db
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
        getProducts().then((data) => setProducts(data));
      })
      .catch((error) => {
        console.error("Error al agregar producto:", error);
      });
  };

 //function to delete  information  product to the db
  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then(() => {
        getProducts().then((data) => setProducts(data));
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
      });
  };

  return (
    //dashboardProducts component display Form of product and Table information  of products 
    <div >
     {/* Form product for submit new product to db  */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="nombre producto" />

        <input type="text" name="description" value={newProduct.description} onChange={handleChange} placeholder="descripcion producto"/>

        <input type="text" name="src" value={newProduct.src}  onChange={handleChange} placeholder="url imagen producto"/>

        <input type="number"  name="price"  value={newProduct.price} onChange={handleChange} placeholder="precio producto" />

        <input type="text" name="off" value={newProduct.off} onChange={handleChange} placeholder="descuento producto"/>
       
        <input type="number" name="categoryId" value={newProduct.categoryId} onChange={handleChange} placeholder="categoria del  producto" />

        <input name="image" type="file" />

        <button className={styles.crear} type="submit"> Enviar </button>
      </form>
      
      {/* Table products display information of category from db  */}
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.src}</td>
              <td>{product.price}</td>
              <td>{product.off}</td>
              <td>{product.categoryId}</td>
              <td>
                <button className={styles.eliminar} onClick={() => {handleDelete(product.id);}}>
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
// export component Products for use in DashBoard component 
export default Products;
