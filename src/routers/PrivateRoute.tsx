import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useAuthStore from '../hooks/useAuthStore';
import { API_ENDPOINT, BE_PORT, BE_URL } from '../constant';
import { loginUser } from '../contexts/auth/actions';
import useFriendSocket from '../hooks/useFriendSocket';

type PrivateRouteProps = {
    children?: ReactNode;
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [authStore, dispatchAuthStore] = useAuthStore();
    const [cookies, , deleteCookie] = useCookies(['token']);
    const [friendSocket, friends] = useFriendSocket();
    // Check auth
    useEffect(() => {
        if (!cookies.token) {
            navigate('/auth', {
                state: {
                    from: location,
                },
            });
        }
        if (!authStore?.isLogging) {
            const url = `${BE_URL}:${BE_PORT}${API_ENDPOINT.get_my_info}`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.token}`,
                },
            })
                .then(async (response) => {
                    if (!response.ok) throw new Error('Token is expired!');
                    const json = await response.json();
                    const newInfo = json.payload;
                    dispatchAuthStore &&
                        dispatchAuthStore(loginUser(true, newInfo));
                })
                .catch(() => {
                    deleteCookie('token');
                    navigate('/auth', {
                        state: {
                            from: location,
                        },
                    });
                });
        }
    }, [cookies]);
    useEffect(() => {
        console.log(friends);
    }, [friends]);
    return (
        <>
            {authStore?.isLogging ? (
                children
            ) : (
                // <Navigate to={'/auth'} state={{ from: location }} />
                <></>
            )}
        </>
    );
};

export default PrivateRoute;
