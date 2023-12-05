// import hooks of react 
import { useState } from "react";
//import styles module for CarShopCard component 
import styles from "../../styles/App.module.css";
//import icons for App from ReactIcons 
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from "react-icons/ai";



function CarShopCard(){
    // state for store quantity  of products 
    const [size, setSize] = useState(0);
    // function for change quantity  of products
    const onPlusSize = () => setSize(size + 1);
    const onMinusSize = () => size === 0 ? setSize(0):setSize(size - 1)

    return(
      //carshopCard component display content car shop,price total, quantity products and information of products
        <aside className={styles.modalCard}>
          {/* Imagen of producto */}
          <div className={styles.modalCard__img}>
            <img src="../src/assets/Hamburguesa01.png" alt="" />
          </div>
          {/* information of producto */}
          <div className={styles.modalCard__info}>
              <h4>Hamburgesa</h4>
              <p>Descripción corta</p>
              <strong>30.000 COP</strong>
          </div>
          {/* quantity of producto */}
          <div className={styles.modalCard__size}>
              <AiOutlineMinusCircle onClick={onMinusSize}/>
              <p>{size}</p>
              <AiOutlinePlusCircle onClick={onPlusSize}/>
          </div>
      </aside>
    );
}
// export component carShopCard for use in App component 
export default CarShopCard