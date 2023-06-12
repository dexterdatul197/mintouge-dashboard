import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './i18n';
import App from './App';
import store from './store';;
import LoadingScreen from '@components/Common/LoadingScreen';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={<LoadingScreen />}>
                    <App />
                </Suspense>
            </BrowserRouter>
        </Provider>
    </React.Fragment>
);