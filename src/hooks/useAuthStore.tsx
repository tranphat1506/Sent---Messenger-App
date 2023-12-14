import { UserContext } from '../contexts/Auth';
import { useContext } from 'react';

const useAuthStore = () => {
    return useContext(UserContext);
};
export default useAuthStore;
