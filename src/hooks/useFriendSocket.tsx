import { useEffect, useState } from 'react';
import useSocketIO, {
    handleConnectError,
    handleConnectTimeout,
} from './useSocketIO';
import { useCookies } from 'react-cookie';
import { Socket } from 'socket.io-client';
import useAuthStore from './useAuthStore';

const useFriendSocket = () => {
    // init socket
    const [authStore, dispatchAuthStore] = useAuthStore();
    const [sockets, dispatch] = useSocketIO();
    const [cookies] = useCookies(['token']);
    const [friends, setFriends] = useState({});
    // let connectedSocket = sockets['http://localhost:300/online'];
    let connectedSocket: Socket | undefined;

    useEffect(() => {
        connectedSocket = dispatch?.addSocket('http://localhost:300/online', {
            extraHeaders: {
                Authorization: `Bearer ${cookies.token}`,
            },
        });
        if (connectedSocket) {
            // Start connect;
            connectedSocket.connect();
            // Connect success and submit client is online;
            connectedSocket.on(
                'update-online-status__Response',
                (userOnline) => {
                    if (authStore?.detail._id !== userOnline._id)
                        setFriends({
                            ...friends,
                            [userOnline._id]: userOnline,
                        });
                },
            );
            connectedSocket.on(
                'my-list-friend__Response',
                (listFriend: any[]) => {
                    const friendObject: any = {};
                    listFriend.forEach((friend) => {
                        if (friend) friendObject[friend._id] = friend;
                    });
                    setFriends({ ...friends, ...friendObject });
                },
            );
            // Lắng nghe sự kiện connect_error
            connectedSocket.on('connect_error', handleConnectError);
            // Lắng nghe sự kiện connect_timeout
            connectedSocket.on('connect_timeout', handleConnectTimeout);
        }
        return () => {
            connectedSocket?.disconnect();
        };
    }, [authStore]);

    return [connectedSocket, friends];
};

export default useFriendSocket;
