import { useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Login from '@/src/components/Auth/Login';
import Register from '@/src/components/Auth/Register';
const AuthPage: React.FC<{}> = () => {
    const params = useParams();
    const [search, setSearch] = useSearchParams('');
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
        if (!returnPage.current) returnPage.current = '/home';
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
