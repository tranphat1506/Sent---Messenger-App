import { useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Login from '@/src/components/Auth/Login';
import Register from '@/src/components/Auth/Register';
import useAuthStore from '@/src/hooks/useAuthStore';
import { API_ENDPOINT, BE_PORT, BE_URL } from '@/src/constant';
import { logoutUser } from '@/src/contexts/Auth/actions';
const AuthPage: React.FC<{}> = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams('');
    const [authStore, dispatchAuthStore] = useAuthStore();
    console.log(authStore);
    useEffect(() => {
        if (authStore?.isLogging) {
            const urlCheck = `${BE_URL}:${BE_PORT}${API_ENDPOINT.check_logging}`;
            const checkIsLogging = fetch(urlCheck, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            checkIsLogging
                .then(async (r) => {
                    const json = await r.json();
                    const r_token =
                        window.localStorage.getItem('token') || undefined;
                    if (!r.ok) {
                        if (r_token) {
                            const urlRefreshToken = `${BE_URL}:${BE_PORT}${API_ENDPOINT.refresh_token}`;
                            const res = await fetch(urlRefreshToken, {
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    r_token: r_token,
                                }),
                            });
                            const { token } = await res.json();
                            console.log(token);

                            // if (token) return navigate(returnPage as any);
                        }
                        dispatchAuthStore && dispatchAuthStore(logoutUser());
                    }
                    // return navigate(returnPage as any);
                })
                .catch((error) => {
                    dispatchAuthStore && dispatchAuthStore(logoutUser());
                });
        }
    }, []);
    const t = useRef(search.get('t'));
    const returnPage = useRef(search.get('return'));
    useEffect(() => {
        document
            ?.querySelector('body')
            ?.style.setProperty('backgroundColor', '#fff');
        return () => {
            document
                ?.querySelector('body')
                ?.style.setProperty('backgroundColor', 'unset');
        };
    });
    useEffect(() => {
        returnPage.current = search.get('return');
        t.current = search.get('t');
        if (!returnPage.current) returnPage.current = '/';
        switch (t.current) {
            case 'sign_out':
                t.current = 'sign_out';
                break;
            case 'sign_up':
                t.current = 'sign_up';
                break;
            default:
                t.current = 'sign_in';
                break;
        }
        setSearch(`t=${t.current}&return=${returnPage.current}`);
    }, [search]);
    return (
        <>
            {t.current === 'sign_in' && (
                <Login returnPage={returnPage.current}></Login>
            )}
            {t.current === 'sign_up' && (
                <Register returnPage={returnPage.current}></Register>
            )}
        </>
    );
};

export default AuthPage;
