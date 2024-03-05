import React from 'react';
import {useTranslation} from 'react-i18next';

const Loading = () => {
  // eslint-disable-next-line,
  const {t} = useTranslation();
  return (
    <h3 id='loading-icon'>Loading...</h3>
  );
};

export default Loading;
