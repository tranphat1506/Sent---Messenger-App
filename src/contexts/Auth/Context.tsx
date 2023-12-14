import { createContext, Dispatch } from 'react';
import { UserPayload, UserState } from './types';
const Context = createContext<[UserState | null, Dispatch<UserPayload> | null]>(
    [null, null],
);

export default Context;
