import { useReducer } from 'react';
import Context from '../auth/Context';
import reducer, { defaultUserState } from '../auth/reducer';

interface ProviderProps {
    children: React.ReactNode;
}
const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultUserState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};

export default Provider;
