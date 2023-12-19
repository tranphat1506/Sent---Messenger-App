import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routers';
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import { Fragment, useEffect } from 'react';
import useSocketIO from './hooks/useSocketIO';
function App() {
    const [sockets, dispatch, io] = useSocketIO();
    useEffect(() => {
        const response = dispatch?.addSocket({
            namespace: 'http://localhost:300/online',
            isPrivate: true,
        });
        const connectedSocket = response?.socket;
        if (connectedSocket) {
            // Connect success and submit client is online;
            connectedSocket.emit('update-online-status__Request', {});
            connectedSocket.on(
                'update-online-status__Response',
                (userOnline) => {
                    console.log(userOnline);
                },
            );
        }
        return () => {
            connectedSocket?.disconnect();
        };
    }, []);
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
