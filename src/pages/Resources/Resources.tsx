import React from "react";
import styles from "src/pages/Resources/Resources.module.css";
import LocalResources from "src/components/LocalResources/LocalResources";

const Resources = () => {

  return (<div data-testid="page-resources" className={`main-container ${styles.mainContainer}}`}>
    <div className={`${styles.container}`}>
      <LocalResources />
    </div>
  </div>);
};
export default Resources;