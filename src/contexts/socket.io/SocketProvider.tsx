import { useCallback, useEffect, useState } from 'react';
import Context from './Context';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { useCookies } from 'react-cookie';
export interface SocketProviderProps {
    children: React.ReactNode;
}
export type SocketState = { [namespace: string]: Socket };
export type AddSocket = (
    namespace: string,
    socketOptions?: Partial<ManagerOptions & SocketOptions>,
) => Socket | undefined;
const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [sockets, setSocket] = useState<SocketState>({});

    const addSocket = useCallback<AddSocket>(
        (namespace, socketOptions) => {
            if (!namespace) throw new Error('Namespace undefinded.');
            if (!!sockets[namespace]) sockets[namespace].disconnect();
            const newSocket = io(namespace, {
                ...socketOptions,
                autoConnect: false,
            });
            setSocket({ ...sockets, [namespace]: newSocket });
            return newSocket;
        },
        [sockets],
    );
    useEffect(() => {
        return () => {
            Object.keys(sockets).forEach((namespace) => {
                sockets[namespace].disconnect();
            });
        };
    }, [sockets]);
    return (
        <Context.Provider value={[sockets, { addSocket }, io]}>
            {children}
        </Context.Provider>
    );
};

export default SocketProvider;
