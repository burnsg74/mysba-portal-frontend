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
  disabled?: boolean;
}

const ModalInputRadio: React.FC<ModalInputRadioProps> = ({ id, name, value, groupValue, label, help, onChange, disabled=false }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (disabled) return;
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
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`usa-radio__label ${styles.label}`}
          onClick={handleClick}
          >{t(label)}</label>
    </div>);
};

export default ModalInputRadio;