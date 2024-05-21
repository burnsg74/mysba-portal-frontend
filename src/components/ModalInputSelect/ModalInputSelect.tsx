import React  from "react";
import styles from "src/components/ModalInputSelect/ModalInputSelect.module.css";
// import { useTranslation } from "react-i18next";

interface Option { value: string; label: string; }
interface ModalInputSelectProps {
  name: string;
  value: string;
  options: Option[];
  label: string;
  help?: string;
  onChange: (name: string, value: string) => void;
}

const ModalInputSelect: React.FC<ModalInputSelectProps> = ({ name, value, options, label, help, onChange }) => {
  // const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("ModalInputSelect Changed", name, event.target.value);
    onChange(name, event.target.value);
  };

  return (<div className={` ${styles.inputGroup}`}>
      <label className={`${styles.inputLabel}`}>{label}</label>
      {help && <div className={`${styles.inputHelp}`}>{help}</div>}
    <select
      className={`usa-select ${styles.input}`}
      name={name}
      value={value}
      onChange={handleChange}
    >
      <option>- Select -</option>
      {options.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
    </select>
  </div>);
};

export default ModalInputSelect;