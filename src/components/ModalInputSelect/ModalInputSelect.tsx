import React from "react";
import styles from "src/components/ModalInputSelect/ModalInputSelect.module.css";

interface Option {
  value: string;
  label: string;
}

interface ModalInputSelectProps {
  name: string;
  value: string;
  options: Option[];
  label: string;
  help?: string;
  onChange: (name: string, value: string) => void;
}

const ModalInputSelect: React.FC<ModalInputSelectProps> = ({ name, value, options, label, help, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      {options.map((option) => (<option key={value} value={option.value}>{option.label}</option>))}
    </select>
  </div>);
};

export default ModalInputSelect;