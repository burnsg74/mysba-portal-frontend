import React from "react";
import styles from "src/components/Field/Field.module.css";
import {useTranslation} from 'react-i18next';

interface Props {
  label: string;
  value: string;
}

const Field: React.FC<Props> = ({ label, value }) => {
  const {t} = useTranslation();
  return (
    <div className={`${styles["row"]}`}>
      <div className={`${styles["label"]}`}>{t(label)}</div>
      <div className={`${styles["value"]}`}>{value}</div>
    </div>
  );
};

export default Field;
