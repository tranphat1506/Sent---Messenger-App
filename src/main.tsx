import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SettingProvider } from './contexts/setting/index.tsx';
import { UserProvider } from './contexts/Auth/index.tsx';
import { CookiesProvider } from 'react-cookie';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <CookiesProvider defaultSetOptions={{ path: '/' }}>
                    <SettingProvider>
                        <App />
                    </SettingProvider>
                </CookiesProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
