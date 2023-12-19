import { createContext } from 'react';
import { AddSocket, SocketState } from './SocketProvider';
import io from 'socket.io-client';
const Context = createContext<
    [SocketState, { addSocket: AddSocket } | undefined, typeof io | undefined]
>([{}, undefined, undefined]);
export default Context;
