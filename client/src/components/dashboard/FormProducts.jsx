import { useState, useEffect,useRef } from "react";
//import primeReact components and my components
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import InputTextIcon from "./InputTextIcon.jsx";
import InputTextArea from "./InputTextArea.jsx";
import { Button } from 'primereact/button';
//import icons for App from ReactIcons 
import { IoIosInformationCircleOutline } from "react-icons/io"
//import methods of API for consume apiREST (products)
import {getProducts,createProduct,getCategories} from "../../api/apiRequests";
//import styles module for FormProducts component
import styles from "../../styles/DashBoard.module.css";

function FromProducts(){


   //initializing reference to interact with Toast component
   const toast = useRef(null);

   // state for store list of categories
   const [category, setCategory] = useState([]);

   //dynamic style for label of input fields in case of error 
   const [checkValidate , setCheckValidate] = useState(true);

  // state for store list of products
  const [products, setProducts] = useState([]);
 // state for store value inputs form  of  new products
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    off: "",
    categoryId: "",
  });

  useEffect(() => {
    // call getProducts asynchronous function to get list of products from db
    getProducts().then((data) => setProducts(data));
    getCategories().then((data) => setCategory(data));
    
  }, []);

  // Display a success message in the Toast when a product is successfully removed.
  const hadleToastCreateSucces = () => {
    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Nueva categoria creada', life: 4000});
  }

  // Displays a message in the Toast when the category creation action is canceled
  const hadleToastCreateError = () => {
    toast.current.show({ severity: 'info', summary: 'Desaprobado', detail: 'La acción ha sido cancelada', life: 4000});
  }

  // Displays a message in the Toast when the required fields are empty.
  const hadleToastFormError = () => {
    toast.current.show({ severity: 'error', summary: '¡Oops!', detail: 'Por favor, completa todos los campos requeridos.', life: 4000});
  }

  /* Displays a confirmation dialog to create a category.
   If accepted, executes the createcategory function and displays a success message in the Toast.
   If rejected, display an informational message in the Toast.*/
   const confirmDialogCreate = (image) => {
    confirmDialog({
      message: '¿Deseas crear una nueva categoria?',
      header: 'Confirmar',
      icon: <IoIosInformationCircleOutline  style={{fontSize:"2em"}}/>,
      accept:()=> {
        // If accepted, executes the createCategory function and displays a success message in the Toast.
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("price", newProduct.price);
        formData.append("off", newProduct.off);
        formData.append("categoryId", newProduct.categoryId);
        formData.append("image", image);
        
        const formDataObject = {};
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });
        
        console.log(formDataObject);

        createProduct(formData)
          .then(() => {
            getProducts().then((data) => setProducts(data));
          })
          .catch((error) => {
            console.error("Error al agregar producto:", error);
          });                   
        hadleToastCreateSucces()
        setNewProduct({
          name: "",
          description: "",
          price: "",
          off: "",
          categoryId: ""
        })
      },
      reject:()=>{
        // If rejected, display an informational message in the Toast.
        hadleToastCreateError();
      }, 
      acceptLabel: "Sí",
    });
  };

     //function for submit information category to the db
  const handleSubmit = (e) => {
    e.preventDefault();
    const archiveImage = e.target.querySelector('[name="image"]').files[0];
    //validation fields empty
    if(newProduct.name === "" || newProduct.description === "" || newProduct.price === ""){
      hadleToastFormError();
      setCheckValidate(false)
    }else{
      confirmDialogCreate(archiveImage);
    }  
  };

    //function to detect changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "categoryId"){          
           setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value.id,
          }));
          
        }else{
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
          }));
        }
      };

    const getSelectedDropdownValue = () => {
      return category.find(c => c.id === newProduct.categoryId);
    };

    


 return (
    <>
     {/* Toast component to display popup messages */}
      <Toast ref={toast} />     
     {/* Confirmation dialog with custom accept label */}
      <ConfirmDialog acceptLabel="Sí"/>
     {/* Form product for submit new product to db  */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <InputTextIcon type="text" name="name" value={newProduct.name} handleChange={handleChange} placeholder="Ej: Hamburguesa" check={checkValidate} label="Nombre del producto"/>

        {/* <InputTextIcon type="text" name="src" value={newProduct.src}  handleChange={handleChange} placeholder="url imagen producto" check={checkValidate}/> */}

        <InputTextIcon type="number"  name="price"  value={newProduct.price} handleChange={handleChange} placeholder="Ej: 10000" label="Precio del producto"check={checkValidate} />

        <Dropdown  value={getSelectedDropdownValue()} onChange={handleChange} placeholder="Seleccionar Categoria" optionLabel="name" options={category} className={styles.dropdownInput} name="categoryId"/>

        <InputTextIcon type="text" name="off" value={newProduct.off} handleChange={handleChange} placeholder="Ej: 30% OFF" label="Descuento del producto (Opcional)" check={checkValidate} />


        <InputTextArea type="text" name="description" value={newProduct.description} handleChange={handleChange} placeholder="Ej:Pan, carne, queso, tomate, lechuga, cebolla " label="Descripción del producto" check={checkValidate}/>
       
       <input type="file" name="image"/>

        <Button className={styles.btnAdd} label="Añadir Producto"type="submit"/>
      </form>
    </>
 );
}


export default FromProducts