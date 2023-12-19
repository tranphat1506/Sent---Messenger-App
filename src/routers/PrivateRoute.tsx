import { ReactNode, useLayoutEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useAuthStore from '../hooks/useAuthStore';
import { API_ENDPOINT, BE_PORT, BE_URL } from '../constant';
import { loginUser } from '../contexts/auth/actions';

type PrivateRouteProps = {
    children?: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [authStore, dispatchAuthStore] = useAuthStore();
    const [cookies, , deleteCookie] = useCookies(['token']);
    useLayoutEffect(() => {
        if (!cookies.token) {
            return navigate('/auth', {
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
