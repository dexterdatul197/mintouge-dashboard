import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './i18n';
import App from './App';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
        <RecoilRoot>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.Fragment>
);