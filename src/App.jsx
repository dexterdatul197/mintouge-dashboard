import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Routes, Route } from 'react-router-dom';

import AuthLayout from '@components';
import Authmiddleware from './routes/route';
import Pages404 from './pages/Utility/pages-404';
import NonAuthLayout from '@components/NonAuthLayout';
import { authProtectedRoutes, publicRoutes } from './routes';

// Import scss
import './assets/scss/theme.scss';

if (document.body) {
    document.body.setAttribute("data-sidebar", "dark");
    document.body.setAttribute("data-topbar", "dark");
}

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const App = (props) => {

    return (
        <Elements stripe={stripePromise}>
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

                <Route path="*" element={<Pages404 />} />
            </Routes>
        </Elements>
    );
};

export default App;
