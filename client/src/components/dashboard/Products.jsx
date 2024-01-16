//import components of PrimeReact, FormCategories and DataTableCategories
import { TabView, TabPanel } from 'primereact/tabview';
import DataTableProducts from "./DataTableProducts.jsx";
import FromProducts from "./FormProducts.jsx";



function Products() {
 
  return (
    //dashboardProducts component display Form of product and Table information  of products 
    <div >
      
      {/* Table products display information of category from db  */}
      <div>
       {/* Tab View to switch between different views (New Category and Category List) */}
      <TabView  style={{width:"100vw"}}>
          {/* Tab Panel for creating a new category */}
          <TabPanel header="Nuevo producto" >
          {/* FormProducts display form of category to create new category   */}
            <FromProducts/>
         </TabPanel>
           {/* Tab Panel for listing categories */}
          <TabPanel header="Lista de productos" >
           {/* DataTablecategories display information of category from db and allow to CRUD (delete,update,read) */}
              <DataTableProducts/>
          </TabPanel>
      </TabView>
    </div>
    </div>
  );
}
// export component Products for use in DashBoard component 
export default Products;
