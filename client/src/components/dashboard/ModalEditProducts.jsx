import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { getProduct } from "../../api/apiRequests.js";
import FromProducts from "./FormProducts.jsx";

function ModalEditProducts({ check, handleModal, idProduct, handleUpdateTableProducts }) {
  const value = idProduct;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (value) {
      getProduct(value)
        .then((data) => setProduct(data))
        .catch((error) => {
          console.error("Error al traer producto:", error);
        });
  
    } else {
      return;
    }
  }, [value]);


  return (
    <Dialog
      header="Actualizar producto"
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
      {value != product.id ? (
        <ProgressSpinner />
      ) : (
        <FromProducts  dataProduct={product} handleUpdateTableProducts={handleUpdateTableProducts}  handleUpdateModalProducts={setProduct} idProductUpdate={value}/>
      )}
    </Dialog>
  );
}

export default ModalEditProducts;
