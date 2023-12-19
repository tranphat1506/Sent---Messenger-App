import { useCallback, useEffect, useState } from 'react';
import Context from './Context';
import io, { Socket } from 'socket.io-client';
import { useCookies } from 'react-cookie';
export interface SocketProviderProps {
    children: React.ReactNode;
}
export type SocketState = { [namespace: string]: Socket };
export type AddSocket = ({
    namespace,
    isPrivate,
}: {
    namespace: string;
    isPrivate: boolean;
}) => {
    status: number;
    message: string;
    socket: Socket | null;
};
const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [sockets, setSocket] = useState<SocketState>({});
    const [cookies] = useCookies(['token']);

    const addSocket = useCallback<AddSocket>(
        ({ namespace, isPrivate }) => {
            if (!namespace)
                return {
                    status: 400,
                    message: 'Invalid namespace!',
                    socket: null,
                };
            if (!cookies.token && isPrivate)
                return { status: 401, message: 'Unauthorized!', socket: null };
            if (!!sockets[namespace]) {
                return {
                    status: 200,
                    message: `Success connect to ${namespace}`,
                    socket: sockets[namespace],
                };
            }
            const newSocket = io(namespace, {
                extraHeaders: {
                    Authorization: `Bearer ${cookies.token}`,
                },
                withCredentials: true,
                autoConnect: true,
            });
            setSocket({ ...sockets, [namespace]: newSocket });
            return {
                status: 200,
                message: `Success connect to ${namespace}`,
                socket: newSocket,
            };
        },
        [sockets, cookies],
    );
    useEffect(() => {
        if (!cookies.token) {
            Object.keys(sockets).forEach((namespace) => {
                sockets[namespace].disconnect();
            });
        }
        return () => {
            Object.keys(sockets).forEach((namespace) => {
                sockets[namespace].disconnect();
            });
        };
    }, [cookies, sockets]);
    return (
        <Context.Provider value={[sockets, { addSocket }, io]}>
            {children}
        </Context.Provider>
    );
};

export default SocketProvider;
