import React, { ReactNode } from "react";
import styles from "src/components/Field/Field.module.css";
import { useTranslation } from "react-i18next";

interface Props {
  label: string;
  value: ReactNode;
}

const Field: React.FC<Props> = ({ label, value }) => {
  const { t } = useTranslation();
  return (<div className={`${styles.row}`}>
      <div className={`${styles.frame}`}>
        <div className={`${styles.label}`}>{t(label)}</div>
        <div className={`${styles.value}`}>{value}</div>
      </div>
    </div>);
};

export default Field;
