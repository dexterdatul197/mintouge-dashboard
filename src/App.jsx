import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';

import { authProtectedRoutes, publicRoutes } from './routes';
import Authmiddleware from './routes/route';
import AuthLayout from '@components';
import NonAuthLayout from '@components/NonAuthLayout';

// Import scss
import './assets/scss/theme.scss';

if (document.body) {
    document.body.setAttribute("data-sidebar", "dark");
    document.body.setAttribute("data-topbar", "dark");
}

const App = (props) => {

    return (
        <React.Fragment>
            <Routes>
                {publicRoutes.map(route => (
                    <Route
                        path={route.path}
                        element={
                            <NonAuthLayout>
                                {route.component}
                            </NonAuthLayout>
                        }
                        key={route.path}
                        exact={true}
                    />
                ))}

                {authProtectedRoutes.map(route => (
                    <Route
                        path={route.path}
                        element={
                            <Authmiddleware>
                                <AuthLayout>
                                    {route.component}
                                </AuthLayout>
                            </Authmiddleware>
                        }
                        key={route.path}
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
