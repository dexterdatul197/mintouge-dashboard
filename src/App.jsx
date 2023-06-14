import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';

import { authProtectedRoutes, publicRoutes } from './routes';
import Authmiddleware from './routes/route';
import AuthLayout from './components/Layout';
import NonAuthLayout from './components/NonAuthLayout';

// Import scss
import './assets/scss/theme.scss';

const App = (props) => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <AuthLayout>{route.component}</AuthLayout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

export default App;
