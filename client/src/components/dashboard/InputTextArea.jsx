// import hooks of react
import { useState, useEffect } from "react";
//import primeReact components
import { InputTextarea } from "primereact/inputtextarea";
//import styles module for InputTextArea component
import styles from "../../styles/DashBoard.module.css";

function InputTextArea({
  name,
  label,
  regex,
  placeholder,
  handleChange,
  check,

}) {
  const [prevValue, setPrevValue] = useState("");
  //dynamic style for label of input fields in case of error
  const [checkValidate, setCheckValidate] = useState(check);

  useEffect(() => {
    // Check if check (indicating successful or failed validation)}
    if (check === true) {
      setCheckValidate(check);
      setTextError("");
    } else {
      setCheckValidate(check);
      setTextError("¡Espera! Olvidaste llenar este campo");
    }
  }, [check]);

  // dynamic text for label of input fields in case of error
  const [textError, setTextError] = useState("");

  function handleValidate(e) {
    e.preventDefault();

    const { value } = e.target;

    if (value.length >= 0 && value.length < 100) {
      // The input is valid, no error message is displayed.
      setPrevValue(value);
      handleChange(value, name);
      setCheckValidate(true);
      setTextError("");
    } else if (value.length === 100) {
      // the input is equal to 30 characters message is displayed
      setTextError("¡Atención! Límite de 100 caracteres alcanzado.");
    } else {
      // The input is empty, an error message is set and indicated that it is invalid.
      setCheckValidate(false);
      setTextError("¡Espera! Olvidaste llenar este campo");
    }
  }

  return (
    <>
      {/* Main container of the component */}
      <div className={styles.containerInputOfForm}>
        {/* Label associated with the input field */}
        <label htmlFor={name}>
          <strong>{label}</strong>
        </label>
        {/* Text input field */}
        <InputTextarea
          className={
            checkValidate
              ? styles.containerInputOfForm__inputTextArea
              : styles.containerInputOfForm__inputTextArea__isSeleted
          }
          type="text"
          name={name}
          value={prevValue}
          placeholder={placeholder}
          keyfilter={regex}
          onInput={handleValidate}
          maxLength={100}
        />
        {/* Error message*/}
        <small
          className={
            checkValidate ? "" : styles.containerInputOfForm__textError
          }
        >
          {textError}
        </small>
      </div>
    </>
  );
}
// export  inputTextArea  component for use in FormCategories component
export default InputTextArea;
