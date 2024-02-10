// import hooks of react
import { useEffect, useState } from "react";
//import primeReact components
import { InputText } from 'primereact/inputtext';
//import primeReact components
import { IoIosWarning } from "react-icons/io";
//import styles module for InputTextIcon component
import styles from "../../styles/DashBoard.module.css";



function InputTextIcon({name,label,value,placeholder,handleChange,check,regex}){
     
    const [prevValue, setPrevValue] = useState('');
    //dynamic style for label of input fields in case of error
    const [checkValidate , setCheckValidate] = useState(check);


     // dynamic text for label of input fields in case of error
     const [textError , setTextError] = useState("");
     
    useEffect(()=>{
      // Check if check (indicating successful or failed validation)}
      if(check===true){
        setCheckValidate(check)
        setTextError("")
      }else{
        setCheckValidate(check)
        setTextError("¡Espera! Olvidaste llenar este campo")
      }
    },[check])


    /**
    * Function that validates a regular expression on an input event and performs actions based on the validation
    * @param {Object} event - Evento de input.
    * @param {RegExp} validatePattern - regular expression handle from prop keyfilter={notEmptyRegex} validateOnly
    */

    function handleValidate (e, validatePattern) {
        e.preventDefault();
        
        const {value} = e.target;
    
        if(validatePattern){
          if(value.length >= 0 && value.length < 30 ){
            // The input is valid, no error message is displayed.
            handleChange(value,name);
            console.log(value)
            setPrevValue(value);
            setCheckValidate(true)
            setTextError("")
          }else if (value.length === 30){
            // the input is equal to 30 characters message is displayed
            setTextError("¡Atención! Límite de 30 caracteres alcanzado.")
          } else{
            // The input is empty, an error message is set and indicated that it is invalid.
            setCheckValidate(false)
            setTextError("¡Espera! Olvidaste llenar este campo")
          }
        }
      }

    return (
    <>
        {/* Main container of the component */}
        <div className={styles.containerInputOfForm}>
          {/* Label associated with the input field */}
            <label htmlFor={name}><strong>{label}</strong></label>
            {/*  container of group Icon and Input */}  
            <div className={styles.containerInputOfForm__group}>
              {/* Icon associated with the input field */}
              <IoIosWarning   className={checkValidate ?styles.containerInputOfForm__group__Icon__isSeleted :styles.containerInputOfForm__group__Icon} />
              {/* Text input field */}
              <InputText  className={checkValidate ? styles.containerInputOfForm__group__inputText : styles.containerInputOfForm__group__inputText__isSeleted } type="text" name={name} value={prevValue}  placeholder={placeholder} maxLength={30}  keyfilter={regex} validateOnly  onInput={handleValidate}/> 
            </div>
            {/* Error message */}
            <small className={checkValidate ? "" : styles.containerInputOfForm__textError}> {textError}</small>
        </div>
    </>
    );
}

// export  inputTextIcon component for use in FormCategories component 
export default InputTextIcon;