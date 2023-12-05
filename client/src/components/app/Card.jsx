// import hooks of react 
import {useState} from "react";
//import modal component for see complete information product
import { Modal } from "react-responsive-modal";
//import icons for App from ReactIcons 
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";
import { CgMathPlus} from "react-icons/cg";
import {CiCircleMore} from "react-icons/ci";
//import styles module for Card component 
import styles from "../../styles/App.module.css";



function Card({title, price, src, description, off}){
   // state for handle conditional rendering icon Heart
    const [stateIcon,setStateIcon] = useState(true);
    // state for handle conditional rendering open and close modal
    const [open, setOpen] = useState(false);
    // function for change state modal 
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
      <div>
        {/* Card component that displays information about a product. */}
        <div className={styles.card}>
            {/* header card has button open modal and icon heart*/}
            <div className={styles.card__icon}>
              <CiCircleMore onClick={onOpenModal}/>
              {stateIcon ? <AiOutlineHeart onClick={()=>{setStateIcon(!stateIcon)}}/> : <AiFillHeart style={{ color:   "red"}} onClick={()=>{setStateIcon(!stateIcon)}}/>}
            </div>
            {/* body card has image of product*/}
            <div className={styles.card__img}>
              <img src={src} alt="" />
            </div>
            {/* footer card has information of product and button of add car shop*/}
            <div className={styles.card__info}>
              <h3>{title}</h3>
              <p>{description}</p>
              <strong>{price} {off!== undefined? <p>{off}</p> : <p></p>}</strong>
                <button className={styles.card__info__btn}>
                  Agregar al carrito <CgMathPlus/>
                </button>
            </div>
         </div>
        {/* Modal card has information complete of product*/}
         <Modal  className={styles.modalProduct} open={open} onClose={onCloseModal} center>
            <h3 className={styles.modalProduct__title}>{title}</h3>
            <div className={styles.card__img}>
              <img src={src} alt="" />
            </div>
            <p>{description}</p>
            <strong className={styles.modalProduct__price}> Precio: {price} </strong>
        </Modal> 
      </div>
    );
}

// export component card for use in App component 
export default Card;