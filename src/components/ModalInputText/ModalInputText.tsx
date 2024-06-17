import React from "react";
import styles from "src/components/ModalInputText/ModalInputText.module.css";

interface ModalInputTextProps {
  name: string,
  value: string,
  label: string,
  help?: string,
  onChange: (name: string, value: string) => void,
  required?: boolean
  isPassword?: boolean
  errorMessage?: string
}

const ModalInputText: React.FC<ModalInputTextProps> = ({ name, value, label, help, onChange, required, isPassword=false, errorMessage="" }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (<div className={`${styles.inputGroup}  ${errorMessage ? styles.error : ''}`}>
    <label className={`${styles.inputLabel}`}>{label} {required && <span className={`${styles.redStar}`}>*</span>}</label>
    {help && <div className={`${styles.inputHelp}`}>{help}</div>}
    {errorMessage?.length > 0 && <div className={`${styles.errorMessage}`}>{errorMessage}</div>}
    <input name={name}
           type={isPassword ? 'password' : 'text'}
           value={value}
           className={`usa-input ${errorMessage ? 'usa-input--error' : ''} ${styles.input}`}
           onChange={handleChange}
    />
  </div>);
};

export default ModalInputText;