//import dependencies of react 
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
//general styles for modal and styles for swiper 
import 'react-responsive-modal/styles.css';
import "swiper/css";
import 'swiper/css/bundle';
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primereact/resources/primereact.css';  

// import components 
import App from './App.jsx';
import DashBord from "./DashBoard.jsx";


// routes of my Ecommerce
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path='/*' element={<App />}/>
        <Route path='/DashBoard/*' element={<DashBord />}/>
    </Routes>
  </BrowserRouter>,
)
