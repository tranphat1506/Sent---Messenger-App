import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SettingProvider } from './contexts/setting/index.tsx';
import { UserProvider } from './contexts/Auth/index.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <SettingProvider>
                    <App />
                </SettingProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
