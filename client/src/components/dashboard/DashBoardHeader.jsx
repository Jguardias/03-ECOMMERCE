// import hooks of react and react DOM
import { Link } from "react-router-dom";
//import menu side
import {slide as MenuBurger} from "react-burger-menu"
//import icons for App from ReactIcons 
import { HiOutlineLocationMarker, HiOutlineMenu } from "react-icons/hi";
//import icons for App from ReactIcons 
import { TbCategory } from "react-icons/tb";
import { CgShoppingBag } from "react-icons/cg";
import { GiCook } from "react-icons/gi";
import { FaListCheck } from "react-icons/fa6";
import { BsClipboardCheck } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
//import styles module for Header component 
import styles from "../../styles/Dashboard.module.css";

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
      background: "#111827",
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
      gap: "8px",
      color: '#b8b7ad',
      paddingTop: "15px"
    },
    bmItem: {
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
    },
    bmOverlay: {
      position: "fixed",
      top: "0px",
      left: "0px",
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

const OPTIONS =[
  {
        //{/* CRUD Categories */ }
       name:"Dashboard",
       link: "/DashBoard",
       icon: <TbCategory/>
  },
  {
    //{/* CRUD Categories */ }
   name:"Categorias",
   link: "/DashBoard",
   icon: <BsClipboardCheck />
  },
  //{/* CRUD Products */ }
  {
    name:"Productos",
    link: "/DashBoard/products",
    icon: <FaListCheck />
  },
  //{/* CRUD Products */ }
  {
    name:"Sistema de compras",
    link: "/DashBoard/shopCars",
    icon: <CgShoppingBag /> 
  },
  //{/* CRUD System orders */ }
  {
    name:"Sistema de ordenes",
    link: "/DashBoard/shopCars",
    icon: <GiCook />
  }
]



function DashBoardHeader() {

  return (
  // menu SPA for navegation in dashboard 
      <header className={styles.header} >
          {/*information and nav (menu burger) */}
            <div className={styles.header__info}>
              {/*(menu burger) */}
              <MenuBurger styles={stylesMenuBurger}  customBurgerIcon={<HiOutlineMenu/>}>
                <div className={styles.header__info__titleMenu}>
                <CiSettings   style={{color:"white",fontSize: "30px"}}/>
                <h3>Punto de control</h3>
                </div>    
                
                <div className={styles.header__info__subTitleMenu}>
                    <h3>NAVEGACIÓN</h3>
                    <p>Opciones:</p>
                </div>

                  {OPTIONS.map((elem,index)=>(
                    <Link key={index} to={elem.link} className={styles.header__info__linkMenu}>
                    {elem.icon}
                    <p>{elem.name}</p>
                    </Link>                   
                  ))}
              </MenuBurger> 
              {/* information */} 
              {/* <HiOutlineLocationMarker className={styles.header__info__icon} />
              <div className={styles.header__info__title}>
                <h3>Rocket DashBoard</h3>
                <p>Calle 72 #45-67, Barranquilla, Colombia</p>
              </div> */}
            </div>
      </header>
  );
}
// export component Header for use in App component 
export default DashBoardHeader