import React, { useEffect } from 'react';
import styles from 'src/pages/Error/Error.module.css';
import { useTranslation } from 'react-i18next';
import { setNav, setShowProfile } from 'src/store/showNav/showNavSlice';
import { useDispatch } from 'react-redux';
import errorSVG from 'src/assets/error.svg';

const ErrorPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setShowProfile(false));
  }, []);

  return (
    <div className={`${styles.errorContainer}`}>
      <img src={errorSVG} alt="error occured" className={`${styles.errorImage}`} />
      <div className={`${styles.errorMessage}`}>{t('Oops, looks like something went wrong')}</div>
    </div>
  );
};

export default ErrorPage;
