import React, { useEffect } from "react";
import {useTranslation} from 'react-i18next';


const Callback = () => {
  useEffect(() => {
    console.log('Callback: Mounted');
  }, []);
  const {t} = useTranslation();
  return (
    <h3 id='loading-icon'>{t('Initializing')}...</h3>
  );
};

export default Callback;
