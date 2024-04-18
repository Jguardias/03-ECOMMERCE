import axios from "axios"


//rutas products
export const getProducts =  async () =>{
    return axios.get("/products").then((response) => response.data);
  }

export const getProduct = async (productId) =>{
  return axios.get(`/products/${productId}`).then((response) => response.data);
} 

export const createProduct = async (nuevoProducto) => {
    return axios.post("/products", nuevoProducto).then((response) => response.data);
  }

export const deleteProduct = async (productId) => {
    return axios.delete(`/products/${productId}`).then((response) => response.data);
  };

export const updateProduct = async (productId, newProduct) => {
  return axios.put(`/products/${productId}`,  newProduct).then((response) => response.data);
};

  //rutas Categories

  export const getCategories = async () =>{
    return axios.get("/categories").then((response) => response.data);
  }

  export const getCategory = async (categoryId) =>{
    return axios.get(`/categories/${categoryId}`).then((response) => response.data);
  }

export const createCategory = async (nuevoProducto) => {
    return axios.post("/categories", nuevoProducto).then((response) => response.data);
  }

export const deleteCategory = async (productId) => {
    return axios.delete(`/categories/${productId}`).then((response) => response.data);
  };

  export const updateCategory = async (categoryId, newCategory) => {
    return axios.put(`/categories/${categoryId}`,  newCategory).then((response) => response.data);
  };
