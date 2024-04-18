// import hooks of react
import { useEffect, useState, useRef } from "react";
//import components of PrimeReact
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
//import icons for App from ReactIcons
import { MdDeleteForever } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
//import methods of API for consume apiREST (categories)
import { getProducts, deleteProduct } from "../../api/apiRequests";
//import styles module for  DataTableCategories component
import styles from "../../styles/DashBoard.module.css";
import ModalEditProducts from "./ModalEditProducts";

function DataTableProducts() {
  //initializing ModalEdit for element from dataTable Products
  const [visible, setVisible] = useState(false);
    //initializing ModalEdit for element from dataTable Products
    const [data, setData] = useState();
  
  //initializing reference to interact with Toast component
  const toast = useRef(null);

  //Initializing the `filters` state to manage table filters.
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // state for store list of categories
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // call getProducts asynchronous function to get list of categories from db
    getProducts().then((data) => setProducts(data));
  }, []);

  //function to delete  information  products to the db
  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then(() => {
        getProducts().then((data) => setProducts(data));
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
      });
  };

  // Display a success message in the Toast when a category is successfully removed.
  const hadleToastDeleteSucces = () => {
    toast.current.show({
      severity: "success",
      summary: "Éxito",
      detail: "Categoria eliminada",
      life: 4000,
    });
  };

  // Displays an informational message in the Toast when a category deletion is canceled or unsuccessful.
  const hadleToastDeleteError = () => {
    toast.current.show({
      severity: "info",
      summary: "Desaprobado",
      detail: "La acción ha sido cancelada",
      life: 4000,
    });
  };

  /* Displays a confirmation dialog to delete a category.
     If accepted, executes the delete function and displays a success message in the Toast.
     If rejected, display an informational message in the Toast.*/
  const confirmDialogDelete = (id) => {
    confirmDialog({
      message: "¿Deseas eliminar esta categoria?",
      header: "Confirmar",
      icon: <IoIosInformationCircleOutline style={{ fontSize: "2em" }} />,
      accept: () => {
        // If accepted, executes the delete function and displays a success message in the Toast.
        handleDelete(id);
        hadleToastDeleteSucces();
      },
      reject: () => {
        // If rejected, display an informational message in the Toast.
        hadleToastDeleteError();
      },
      acceptLabel: "Sí",
      acceptClassName: "p-button-danger",
    });
  };

  return (
    <>
      {/*Title DataTable */}
      <h2>Listado de productos</h2>
      {/*container DataTable */}
      <div className={styles.containerDataTable}>
        {/* Search Item Group */}
        <div className={styles.containerSearch}>
          {/* Search Entry Group */}
          <div className={styles.groupInputSearch}>
            {/* Search icon */}
            <IoSearchOutline className={styles.groupInputSearch__icon} />
            {/* Search entry */}
            <InputText
              onInput={(e) =>
                setFilters({
                  global: {
                    value: e.target.value,
                    matchMode: FilterMatchMode.CONTAINS,
                  },
                })
              }
              placeholder="Buscar"
              className={styles.groupInputSearch__input}
            />
          </div>
        </div>
        {/*DataTable component of primeReact */}
        <DataTable
          filters={filters}
          value={products}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10]}
        >
          <Column field="id" header="ID" align={"center"}></Column>
          <Column field="name" header="Nombre" align={"center"}></Column>
          <Column
            field="description"
            header="Descripción"
            align={"left"}
          ></Column>
          <Column field="price" header="Precio" align={"center"}></Column>
          <Column field="off" header="Descuento" align={"center"}></Column>
          <Column
            field="src"
            header="Vista"
            align={"center"}
            body={(data) => (
              <img src={data.src} width={"100px"} height={"100px"}></img>
            )}
          ></Column>
          <Column
            field="categoryId"
            header="Categoria"
            align={"center"}
          ></Column>
          <Column
            field=""
            align={"center"}
            body={(data) => (
              <div key={data.id} className={styles.btnTableOptions}>
                <button
                  className={styles.btnEdit}
                  onClick={() => {
                    setData(data.id);
                    setVisible(true);
                  }}
                >
                  <HiOutlinePencil />
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => confirmDialogDelete(data.id)}
                >
                  {" "}
                  <MdDeleteForever />
                </button>
              </div>
            )}
          ></Column>
        </DataTable>
        {/* Toast component to display popup messages */}
        <Toast ref={toast} />
        {/* Confirmation dialog with custom accept label */}
        <ConfirmDialog acceptLabel="Sí" />
        <ModalEditProducts
          check={visible}
          idProduct={data}
          handleModal={() => {
            setVisible(false);
          }}
          handleUpdateTableProducts={setProducts}
        />
      </div>
    </>
  );
}
// export DataTableProducts component  for use in Categories component
export default DataTableProducts;
