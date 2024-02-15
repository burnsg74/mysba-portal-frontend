import React from "react";
import styles from "src/components/Pill/Pill.module.css";

interface IPillProps {
  message: string;
  type: "success" | "error" | "warning";
}

const Pill: React.FC<IPillProps> = ({ message, type }) => {
  let icon = type === "error" ? "cancel" : type === "warning" ? "warning" : "check";
  return (
    <div className={`${styles["pill__container"]} ${styles["pill-" + type]}`}>
      <svg
        className={`usa-icon ${styles["pill__icon"]}`}
        aria-hidden="true"
        focusable="false"
        role="img"
      >
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`}></use>
      </svg>
      <div className={`${styles["pill__message"]}`}>{message}</div>
    </div>
  );
};

export default Pill;
