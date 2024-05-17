import React, { useEffect } from "react";
import styles from "src/components/ModalInputCheckbox/ModalInputCheckbox.module.css";
import { useTranslation } from "react-i18next";

interface ModalInputCheckboxProps {
  id: string;
  name: string;
  label: string;
  value: string;
  help?: string;
  onChange: (name: string, value: string) => void;
}

const ModalInputCheckbox: React.FC<ModalInputCheckboxProps> = ({ id, name, value, label, help, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("ModalInputCheckbox Changed", name, event.target.value);
    onChange(name, event.target.value);
  };

  return (
      <div className={`usa-checkbox ${styles.frame}`}>
        <input
          id={id}
          className="usa-checkbox__input usa-checkbox__input--tile"
          type="checkbox"
          name={name}
          value="yes"
          checked={value === "yes"}
          onChange={handleChange}
        />
        <label
          className={`usa-checkbox__label ${styles.label}`}
          htmlFor={id}
          >{t(label)}</label>
    </div>);
};

export default ModalInputCheckbox;