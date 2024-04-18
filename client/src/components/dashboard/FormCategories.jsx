// import hooks of react
import { useState, useRef } from "react";
//import primeReact components and my components
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import InputTextIcon from "./InputTextIcon.jsx";
import InputTextArea from "./InputTextArea.jsx";
import { Button } from "primereact/button";
//import icons for App from ReactIcons
import { IoIosInformationCircleOutline } from "react-icons/io";
//import methods of API for consume apiREST (categories)
import {
  getCategories,
  createCategory,
  updateCategory,
  getCategory,
} from "../../api/apiRequests";
//import styles module for App DashBoardCategories component
import styles from "../../styles/DashBoard.module.css";

function FormCategories({
  dataCategory,
  handleUpdateTableCategory,
  handleUpdateModalCategory,
  idCategoryUpdate,
}) {
  //initializing reference to interact with Toast component
  const toast = useRef(null);

  const initDataCategory = dataCategory;

  const regexInputTextIcon = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ%!¡(),:.\s]*$/;

  //dynamic style for label of input fields in case of error
  const [checkValidate, setCheckValidate] = useState(true);

  // state for store value inputs form  of  new category
  const [newCategory, setNewCategory] = useState({
    name: dataCategory ? initDataCategory.name : "",
    size: dataCategory ? initDataCategory.size : "",
    title: dataCategory ? initDataCategory.title : "",
  });

  // Display a success message in the Toast when a category is successfully removed.
  const hadleToastCreateSucces = () => {
    toast.current.show({
      severity: "success",
      summary: "Éxito",
      detail: "Nueva categoria creada",
      life: 4000,
    });
  };

  // Displays a message in the Toast when the category creation action is canceled
  const hadleToastCreateError = () => {
    toast.current.show({
      severity: "info",
      summary: "Desaprobado",
      detail: "La acción ha sido cancelada",
      life: 4000,
    });
  };

  // Displays a message in the Toast when the required fields are empty.
  const hadleToastFormError = () => {
    toast.current.show({
      severity: "error",
      summary: "¡Oops!",
      detail: "Por favor, completa todos los campos requeridos.",
      life: 4000,
    });
  };

  /* Displays a confirmation dialog to create a category.
     If accepted, executes the createcategory function and displays a success message in the Toast.
     If rejected, display an informational message in the Toast.*/
  const confirmDialogCreate = () => {
    confirmDialog({
      message: "¿Deseas crear una nueva categoria?",
      header: "Confirmar",
      icon: <IoIosInformationCircleOutline style={{ fontSize: "2em" }} />,
      accept: () => {
        // If accepted, executes the createCategory function and displays a success message in the Toast.
        createCategory(newCategory).then(() => {
          hadleToastCreateSucces();
          setNewCategory({
            name: "",
            size: "",
            title: "",
          });
        });
      },
      reject: () => {
        // If rejected, display an informational message in the Toast.
        hadleToastCreateError();
      },
      acceptLabel: "Sí",
    });
  };

  const confirmDialogUpdate = (idCategory) => {
    confirmDialog({
      message: "¿Deseas actualizar esta categoria?",
      header: "Confirmar",
      icon: <IoIosInformationCircleOutline style={{ fontSize: "2em" }} />,
      accept: () => {
        updateCategory(idCategory, newCategory)
          .then(() => {
            hadleToastCreateSucces();
            getCategories().then((data) => {
              handleUpdateTableCategory(data);
            });
            getCategory(idCategory).then((data) => {
              handleUpdateModalCategory(data);
            });
          })
          .catch((error) => {
            console.error("Error al actualizar categoria", error);
          });
      },
      reject: () => {
        // If rejected, display an informational message in the Toast.
        hadleToastCreateError();
      },
      acceptLabel: "Sí",
    });
  };

  //function to detect changes in InputTextIcon
  const handleChange = (value, name) => {
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  //  function for submit information category to the db
  function handleSubmit(e) {
    e.preventDefault();
    //validation fields empty
    if (
      newCategory.name === "" ||
      newCategory.size === "" ||
      newCategory.size === ""
    ) {
      hadleToastFormError();
      setCheckValidate(false);
    } else {
      if (dataCategory) {
        confirmDialogUpdate(idCategoryUpdate);
      } else {
        confirmDialogCreate();
      }
    }
  }

  return (
    <>
      {/* Toast component to display popup messages */}
      <Toast ref={toast} />
      {/* Confirmation dialog with custom accept label */}
      {dataCategory ? "" : <ConfirmDialog acceptLabel="Sí" />}
      {/* Form category for submit new category to db  */}
      <form onSubmit={handleSubmit}>
        <InputTextIcon
          type="text"
          name="name"
          regex={regexInputTextIcon}
          label="Nombre de la categoria"
          value={newCategory.name}
          placeholder="Ej: HAMGURGUESA"
          handleChange={handleChange}
          check={checkValidate}
        />

        <InputTextIcon
          name="size"
          regex={regexInputTextIcon}
          label="Número de productos"
          value={newCategory.size}
          placeholder="Ej: 5 productos"
          handleChange={handleChange}
          check={checkValidate}
        />

        <InputTextArea
          name="title"
          regex={regexInputTextIcon}
          label="Titulo vistoso para la categoria"
          value={newCategory.title}
          placeholder="Ej: ¡No te pierdas nuestras promociones de última hora!"
          handleChange={handleChange}
          check={checkValidate}
        />

        <Button
          className={styles.btnAdd}
          label={dataCategory ? "Actualizar categoria" : "Añadir categoria"}
          type="submit"
        />
      </form>
    </>
  );
}

// export  FormCategories component for use in Categories component
export default FormCategories;
