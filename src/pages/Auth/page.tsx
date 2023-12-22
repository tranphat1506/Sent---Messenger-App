import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Login from '@/src/components/Auth/Login';
import Register from '@/src/components/Auth/Register';
const AuthPage: React.FC<{}> = () => {
    const location = useLocation();
    const [search, setSearch] = useSearchParams('');
    const [errorMessage] = useState(location.state?.errorMessage || '');
    let t = search.get('t');
    let returnPage = useRef({
        pathName: location.state?.from
            ? location.state?.from?.pathname + location.state?.from?.search
            : false,
        originalLocation: location.state?.from,
    });
    useEffect(() => {
        if (!t) t = 'sign_in';
        setSearch(`t=${t}&return=${returnPage.current.pathName}`);
    }, [search]);
    return (
        <>
            {t === 'sign_in' && (
                <Login
                    returnPage={returnPage.current}
                    initErrorMessage={errorMessage}
                ></Login>
            )}
            {t === 'sign_up' && (
                <Register
                    returnPage={returnPage.current}
                    initErrorMessage={errorMessage}
                ></Register>
            )}
        </>
    );
};

export default AuthPage;
