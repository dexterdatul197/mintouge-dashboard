import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './i18n';
import App from './App';
import LoadingScreen from '@components/Common/LoadingScreen';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
                <App />
            </Suspense>
        </BrowserRouter>
    </React.Fragment>
);