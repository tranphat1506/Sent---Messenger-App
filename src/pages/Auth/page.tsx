import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Login from '@/src/components/Auth/Login';
import Register from '@/src/components/Auth/Register';
import { CircularProgress } from '@mui/material';
const AuthPage: React.FC<{}> = () => {
    const route = useLocation();
    const [search, setSearch] = useSearchParams('');
    const [accpept, setAccept] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        route.state?.errorMessage || '',
    );
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
    }, []);
    useEffect(() => {
        returnPage.current = search.get('return');
        t.current = search.get('t');
        if (!returnPage.current || returnPage.current.includes('/auth'))
            returnPage.current = '/';
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
        setAccept(true);
    }, [search]);
    return (
        <>
            {!accpept && (
                <div className="w-screen h-screen flex justify-center items-center dark:bg-[#222] text-sky-400">
                    <CircularProgress color="inherit" size={70} />
                </div>
            )}
            {accpept && t.current === 'sign_in' && (
                <Login
                    returnPage={returnPage.current}
                    initErrorMessage={errorMessage}
                ></Login>
            )}
            {accpept && t.current === 'sign_up' && (
                <Register
                    returnPage={returnPage.current}
                    initErrorMessage={errorMessage}
                ></Register>
            )}
        </>
    );
};

export default AuthPage;
