import { Socket } from 'socket.io-client';
import Context from '../contexts/socket.io/Context';
import { useContext, useEffect } from 'react';
export const handleConnectError = (error: any) => {
    console.error('Socket connection error:', error);
    // Xử lý khi kết nối bị lỗi
};
export const handleConnectTimeout = (timeout: any) => {
    console.error('Socket connection timeout:', timeout);
    // Xử lý khi kết nối quá thời gian
};
const useSocketIO = () => {
    return useContext(Context);
};

const useSocketNamespace = (namespace: string) => {
    const [sockets] = useSocketIO();
    if (!namespace) throw new Error(`Namespace is invalid.`);
    let getSocket: Socket = sockets[namespace];
    if (!getSocket) throw new Error(`Namespace::${namespace} is not exist.`);
    useEffect(() => {
        // Lắng nghe sự kiện connect_error
        getSocket.on('connect_error', handleConnectError);

        // Lắng nghe sự kiện connect_timeout
        getSocket.on('connect_timeout', handleConnectTimeout);
        return () => {
            // Huỷ đăng ký sự kiện khi component unmount
            getSocket.off('connect_error', handleConnectError);
            getSocket.off('connect_timeout', handleConnectTimeout);
        };
    }, []);
    return getSocket;
};
export { useSocketNamespace };
export default useSocketIO;
