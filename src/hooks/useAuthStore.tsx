import { UserContext } from '../contexts/auth';
import { useContext } from 'react';

const useAuthStore = () => {
    return useContext(UserContext);
};
export default useAuthStore;
