import { createContext, Dispatch } from 'react';
import { GlobalSetting } from './reducer';
import { ActionPayload } from './actions';
const Context = createContext<
    [GlobalSetting | null, Dispatch<ActionPayload> | null]
>([null, null]);
export default Context;
