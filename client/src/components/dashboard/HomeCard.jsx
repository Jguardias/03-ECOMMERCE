//import primeReact components
import { Card } from "primereact/card";
//import styles module for HomeCard component
import styles from "../../styles/DashBoard.module.css";

function HomeCard({color,value,title}){

    return(
      //update Card Component  
     <Card className={styles.card}>
        <p style={{fontSize: "80px", fontWeight: "600", color: color}}>{value}</p>
        <strong style={{color: color}}>{title}</strong>   
     </Card> 
    );
}

// export  HomeCard  component for use in Home component 
export default HomeCard;