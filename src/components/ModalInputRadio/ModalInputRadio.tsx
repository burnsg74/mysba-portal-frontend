import React from "react";
import styles from "src/components/ModalInputRadio/ModalInputRadio.module.css";
import { useTranslation } from "react-i18next";

interface ModalInputRadioProps {
  id: string;
  name: string;
  value: string;
  groupValue: string;
  label: string;
  help?: string;
  onChange: (name: string, value: string) => void;
}

const ModalInputRadio: React.FC<ModalInputRadioProps> = ({ id, name, value, groupValue, label, help, onChange }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onChange(name, value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
      <div className={`usa-radio ${styles.frame}`}>
        <input
          className={`usa-radio__input usa-radio__input--tile ${styles.input}`}
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={groupValue === value}
          onChange={handleChange}
        />
        <label
          htmlFor={id}
          className={`usa-radio__label ${styles.label}`}
          onClick={handleClick}>{t(label)}</label>
    </div>);
};

export default ModalInputRadio;