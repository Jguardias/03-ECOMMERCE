// import hooks of react 
import { useState } from "react";
//import menu side
import {slide as MenuBurger} from "react-burger-menu"
//import modal component for see car shop 
import { Modal } from "react-responsive-modal"
import  CarShopCard  from "./CarShopCard";
//import icons for App from ReactIcons 
import { HiOutlineLocationMarker, HiOutlineMenu } from "react-icons/hi";
import {AiOutlineShop} from "react-icons/ai";
//import methods of API for consume apiREST (categories) 
import {getCategories} from "../../api/apiRequests.js"
//import styles module for Header component 
import styles from "../../styles/App.module.css";


const stylesMenuBurger = {
    bmBurgerButton: {
        position: 'relative',
        width: '36px',
        height: '30px',
        margin: "4px",
    },
    bmBurgerBars: {
      background: '#FFFFFF'
    },
    bmBurgerBarsHover: {
      background: '#FFFFFF'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      position: "fixed",
      left: "px",
      background: '#bdc3c7',
    },
    bmMenuWrap: {
      position: 'fixed',
      overflow: "auto",
      top: "0px",
      left: "0px",
      height: '100%'
    },
    bmMenu: {
      background: "white",
      fontSize: '1.15em',

    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      flexDirection: "column",
      color: '#b8b7ad',
      paddingTop: "15px"
    },
    bmItem: {
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    bmOverlay: {
      position: "fixed",
      top: "0px",
      left: "0px",
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }



function Header() {
  // state for store list of categories
  const [categories, setCategories] = useState([]);
  // state for handle conditional rendering open and close modal
  const [open, setOpen] = useState(false);
  // function for change state modal 
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useState(()=>{
    // call getCategories asynchronous function to get list of categories from db
    getCategories().then((data) => setCategories(data));
  },[])


  return (
  //header component that displays menu burger,button car shop, information name restaurant, direction,etc . 
      <header className={styles.header} >
          {/*information and nav (menu burger) */}
            <div className={styles.header__info}>
              {/*(menu burger) */}
              <MenuBurger styles={stylesMenuBurger}  customBurgerIcon={<HiOutlineMenu/>}>
                <h3 className={styles.header__info__titleMenu}>Categorias</h3>
                  {categories.map((elem,index)=>(
                              <a   key={index} className={styles.header__info__linkMenu} href="#">
                              <span>{elem.name}</span>
                              <p>{elem.size}</p>
                              </a>  
                  ))}
              </MenuBurger> 
              {/* information */} 
              <HiOutlineLocationMarker className={styles.header__info__icon} />
              <div className={styles.header__info__title}>
                <h3>El Arepa&apos;o</h3>
                <p>Calle 72 #45-67, Barranquilla, Colombia</p>
              </div>
            </div>
            {/*car shop in header */}
            <div  onClick={onOpenModal}  className={styles.header__carShop}>
              <AiOutlineShop style={{ position: 'relative' }} />
              <div className={styles.header__carShop__circle} style={{ position: 'absolute', top: 20, right: 18 }}>
                <p>0</p>
              </div>
            </div>
            {/*modal car shop */}        
            <Modal  className={styles.modal} open={open} onClose={onCloseModal} center >
              <h3 className={styles.modal__title}>Carrito de compras</h3>
              {/* CarShopCard component */}
              <CarShopCard/>
              <footer className={styles.modal__footer}>
                    <p className={styles.modal__footer__text}>Total: 35.000 COP</p>
                    <button className={styles.modal__footer__btn}>Comprar</button>
              </footer>
            </Modal>
      </header>
  );
}
// export component Header for use in App component 
export default Header