import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { getCategory } from "../../api/apiRequests.js";
import FromCategories from "./FormCategories.jsx";

function ModalEditCategory({ check, handleModal, idCategory, handleUpdateTableCategory }) {
  const value = idCategory;
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (value) {
      getCategory(value)
        .then((data) => setCategory(data))
        .catch((error) => {
          console.error("Error al traer producto:", error);
        });
  
    } else {
      return;
    }
  }, [value]);

  return (
    <Dialog
      header="Actualizar categoria"
      position="center"
      visible={check}
      style={{ width: "auto" }}
      contentStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onHide={() => handleModal()}
    >
      {value != category.id ? (
        <ProgressSpinner />
      ) : (
        <FromCategories  dataCategory={category} handleUpdateTableCategory={handleUpdateTableCategory}  handleUpdateModalCategory={setCategory} idCategoryUpdate={value}/>
      )}
    </Dialog>
  );
}

export default ModalEditCategory;
