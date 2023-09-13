import React from 'react';
import { RedocStandalone } from 'redoc';
import apiSpec from './swagger.json';

const ApiDocumentation = () => {
  return (
    <div className="redoc-container">
      <RedocStandalone specUrl={apiSpec} />
    </div>
  );
}

export default ApiDocumentation;
