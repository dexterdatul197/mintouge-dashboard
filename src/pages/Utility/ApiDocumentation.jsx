import React from 'react';
import { RedocStandalone } from 'redoc';
import apiSpecDev from './swagger_dev.json';
import apiSpecProd from './swagger_prod.json';

const ApiDocumentation = () => {
  const isDev = import.meta.env.VITE_ENV === "production";
  return (
    <div className="redoc-container">
      <RedocStandalone specUrl={isDev ? apiSpecDev : apiSpecProd} />
    </div>
  );
}

export default ApiDocumentation;
