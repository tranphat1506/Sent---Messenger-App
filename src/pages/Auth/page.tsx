import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Login from '@/src/components/Auth/Login';
import Register from '@/src/components/Auth/Register';
const AuthPage: React.FC<{}> = () => {
    const location = useLocation();
    const [search, setSearch] = useSearchParams('');
    const [errorMessage] = useState(location.state?.errorMessage || '');
    let t = useRef(search.get('t'));
    let returnPage = useRef({
        pathName: location.state?.from
            ? location.state?.from?.pathname + location.state?.from?.search
            : false,
        originalLocation: location.state?.from,
    });
    useEffect(() => {
        t.current = search.get('t');
        returnPage.current = {
            pathName: location.state?.from
                ? location.state?.from?.pathname + location.state?.from?.search
                : false,
            originalLocation: location.state?.from,
        };
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
        setSearch(`t=${t.current}&return=${returnPage.current.pathName}`);
    }, [search]);
    return (
        <>
            {t.current === 'sign_in' && (
                <Login
                    returnPage={returnPage.current}
                    initErrorMessage={errorMessage}
                ></Login>
            )}
            {t.current === 'sign_up' && (
                <Register
                    returnPage={returnPage.current}
                    initErrorMessage={errorMessage}
                ></Register>
            )}
        </>
    );
};

export default AuthPage;
