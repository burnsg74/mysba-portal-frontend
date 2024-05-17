import React from "react";
import styles from "src/components/ModalInputText/ModalInputText.module.css";
import { useTranslation } from "react-i18next";

interface ModalInputTextProps {
  name: string;
  value: string;
  label: string;
  help?: string;
  onChange: (name: string, value: string) => void;
}

const ModalInputText: React.FC<ModalInputTextProps> = ({ name, value, label, help, onChange }) => {
  const { t } = useTranslation();
  console.log("ModalRadioInput value", value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("ModalRadioInput Changed", name, event.target.value);
    onChange(name, event.target.value);
  };

  return (<div className={` ${styles.inputGroup}`}>
    <label className={`${styles.inputLabel}`}>{label}</label>
    {help && <div className={`${styles.inputHelp}`}>{help}</div>}
    <input name={name}
           value={value}
           className={`${styles.input}`}
           onChange={handleChange}
    />
  </div>);
};

export default ModalInputText;