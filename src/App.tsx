import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routers';
import React from 'react';
function App() {
    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                const Page = route.page;
                const Layout = route.layout || React.Fragment;
                const { props: layoutProps } = route || {};
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout {...layoutProps}>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
            {privateRoutes.map((route, index) => {
                const Page = route.page;
                const Layout = route.layout || React.Fragment;
                const { props: layoutProps } = route || {};
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout {...layoutProps}>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default App;
