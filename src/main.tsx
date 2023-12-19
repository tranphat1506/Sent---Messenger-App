import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SettingProvider } from './contexts/setting/index.tsx';
import { UserProvider } from './contexts/auth/index.tsx';
import { CookiesProvider } from 'react-cookie';
import PrivateSocketProvider from './contexts/socket.io/SocketProvider.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <PrivateSocketProvider>
                <UserProvider>
                    <CookiesProvider defaultSetOptions={{ path: '/' }}>
                        <SettingProvider>
                            <App />
                        </SettingProvider>
                    </CookiesProvider>
                </UserProvider>
            </PrivateSocketProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
