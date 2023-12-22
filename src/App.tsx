import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routers';
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import { Fragment } from 'react';
function App() {
    return (
        <Routes>
            {publicRoutes.map((routeProps, index) => {
                const Page = routeProps.page;
                const Layout: React.FC<any> = routeProps.layout || Fragment;
                const { props: layoutProps } = routeProps;
                return (
                    <Route
                        key={index}
                        path={routeProps.path}
                        element={
                            <PublicRoute>
                                <Layout {...layoutProps}>
                                    <Page />
                                </Layout>
                            </PublicRoute>
                        }
                    />
                );
            })}
            {privateRoutes.map((routeProps, index) => {
                const Page = routeProps.page;
                const Layout: React.FC<any> = routeProps.layout || Fragment;
                const { props: layoutProps } = routeProps;
                return (
                    <Route
                        key={index}
                        path={routeProps.path}
                        element={
                            <PrivateRoute>
                                <Layout {...layoutProps}>
                                    <Page />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default App;
