import axios from "axios"


//rutas productos
export const getProducts = () =>{
    return axios.get("/products").then((response) => response.data);
  }

export const createProduct = (nuevoProducto) => {
    return axios.post("/products", nuevoProducto).then((response) => response.data);
  }

export const deleteProduct = (productId) => {
    return axios.delete(`/products/${productId}`).then((response) => response.data);
  };


  //rutas Categories

  export const getCategories = () =>{
    return axios.get("/categories").then((response) => response.data);
  }

export const createCategory = (nuevoProducto) => {
    return axios.post("/categories", nuevoProducto).then((response) => response.data);
  }

export const deleteCategory = (productId) => {
    return axios.delete(`/categories/${productId}`).then((response) => response.data);
  };

