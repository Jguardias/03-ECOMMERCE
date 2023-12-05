// import hooks of react 
import {useState,useEffect} from "react";
//import components for App component  
import Card from "../src/components/app/Card.jsx";
import Header from "../src/components/app/Header.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,  Pagination} from 'swiper/modules';
//import icons for App from ReactIcons 
import { FaFacebook, FaInstagram,FaTiktok, FaWhatsapp} from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
//import methods of API for consume apiREST (products and categories)
import {getProducts, getCategories} from "./api/apiRequests.js";
//import styles module for App component
import styles from "./styles/App.module.css";


//objet images for slider of imges 
const SLIDES = [
  {
    src: "../src/assets/Imagen1.jpg",
    alt: "Imagen 1",
  },
  {
    src: "../src/assets/Imagen2.jpg",
    alt: "Imagen 2",
  },
  {
    src: "../src/assets/Imagen3.jpg",
    alt: "Imagen 3",
  },
];



function App() {
  // state for store list of products
  const [products, setProducts] = useState([]);
  // state for store list of categories 
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    // call getProducts asynchronous function to get list of products from db
    getProducts().then((data) => setProducts(data));
    // call getCategories asynchronous function to get list of categories from db
    getCategories().then((data) => setCategories(data));
  },[]);

  return (
    //App component join component Card,CarShopCard,Header,Swiper,footer for show information products, categories, etc. 
  <div>
      {/* header component */}
      <Header />
      {/* swiper component -- slider images*/}
      <Swiper  pagination={{clickable: true}} autoplay={{delay:2500, disableOnInteraction: true}} modules={[Autoplay,Pagination]}>
          {SLIDES.map((elem,index)=>(
            <SwiperSlide key={index}><img className={styles.banner} src={elem.src} alt="" /></SwiperSlide>
          ))}
      </Swiper>
     {/* categories and products component*/}         
     {categories.map((category,index)=>(
      <aside key={index} className={styles.container}>
        <h3 className={styles.container__title} >{category.title}</h3>
        <div className={styles.container__categories}>
          {products.map((elem,index)=>(
            category.id === elem.categoryId ?
            (<Card key={index} title={elem.name} price={elem.price} src={elem.src} description={elem.description} off={elem.off}/>) : null
          ))} 
        </div>     
       </aside>
     ))}

    {/* footer extra information */}            
    <footer className={styles.footer}>
        <strong>¡Ven a probar nuestros productos deliciosos y recién preparados de lunes a viernes de 7:00pm a 12:30pm!</strong>
        <p>Siguenos en nuestras redes sociales</p>
        <div className={styles.footer__link}>
          <FaFacebook />
          <FaInstagram />
          <FaTiktok />
          <FaWhatsapp />
        </div>
        <p> <IoIosCall /> +57 332 554 52 32 </p>
        <p>2023 @ Copyrigth: Rocket</p>     
    </footer>      
  </div>
  );
}
//export app component for use in main component 
export default App;
