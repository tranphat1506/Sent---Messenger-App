import { useReducer } from 'react';
import Context from './Context';
import reducer, { defaultUserState } from './reducer';

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
