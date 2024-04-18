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
import { getCategories, deleteCategory } from "../../api/apiRequests";
//import styles module for  DataTableCategories component
import styles from "../../styles/DashBoard.module.css";

import ModalEditCategory from "./ModalEditCategory";

function DataTableCategories() {
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
  const [category, setCategory] = useState([]);

  useEffect(() => {
    // call getCategories asynchronous function to get list of categories from db
    getCategories().then((data) => setCategory(data));
  }, []);

  //function to delete  information  category to the db
  const handleDelete = (categoryId) => {
    deleteCategory(categoryId)
      .then(() => {
        getCategories().then((data) => setCategory(data));
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
      <h2>Listado de categorias</h2>
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
          value={category}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10]}
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="size" header="Cantidad"></Column>
          <Column field="title" header="Titulo"></Column>
          <Column
            field=""
            body={(data) => (
              <div key={data.id} className={styles.btnTableOptions}>
                <button className={styles.btnEdit}                   onClick={() => {
                    setData(data.id);
                    setVisible(true);
                  }}>
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
        <ModalEditCategory
          check={visible}
          idCategory={data}
          handleModal={() => {
            setVisible(false);
          }}
          handleUpdateTableCategory={setCategory}
        />
      </div>
    </>
  );
}
// export DataTableCategories component  for use in Categories component
export default DataTableCategories;
