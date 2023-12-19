//import components of PrimeReact, FormCategories and DataTableCategories
import FormCategories from "./FormCategories.jsx";
import DataTableCategories from "./dataTableCategories.jsx";
import { TabView, TabPanel } from 'primereact/tabview';






function Categories() {


  return (
    //dashboardCategories component display Form of category and Table information  of categories 
    <div>
       {/* Tab View to switch between different views (New Category and Category List) */}
      <TabView  style={{width:"100vw"}}>
          {/* Tab Panel for creating a new category */}
          <TabPanel header="Nueva categoria" >
          {/* FormCategories display form of category to create new category   */}
                <FormCategories/>
         </TabPanel>
           {/* Tab Panel for listing categories */}
          <TabPanel header="Lista de categorias" >
           {/* DataTablecategories display information of category from db and allow to CRUD (delete,update,read) */}
              <DataTableCategories/>
          </TabPanel>
      </TabView>
    </div>
    
  );
}
// export component Categories for use in DashBoard component 
export default Categories;
