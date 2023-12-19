import { Link, useNavigate } from 'react-router-dom';
import Container from '../Common/Container';
import LogoIcon from '../Common/LogoIcon';
import { memo, useState } from 'react';
import { API_ENDPOINT, BE_PORT, BE_URL } from '@/src/constant';
import { useCookies } from 'react-cookie';
import useAuthStore from '@/src/hooks/useAuthStore';
import { loginUser } from '@/src/contexts/auth/actions';
import { throttleFunction } from '@/src/utils/CommonFunction';

const LoginHeader = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPwd, setRememberPwd] = useState(false);
    const [, setCookie] = useCookies(['token']);
    const [authStore, dispatchAuthStore] = useAuthStore();
    const navigate = useNavigate();

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'account':
                setAccount(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'rememberPwd':
                setRememberPwd(e.target.checked);
                break;
            default:
                throw new Error('Invalid input name!');
        }
    };
    const signIn = async () => {
        if (!account || !password) return false;
        try {
            const url = `${BE_URL}:${BE_PORT}${API_ENDPOINT.user_login}`;
            const fetchRes = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account,
                    password,
                    remember_pwd: rememberPwd,
                }),
            });
            const json = await fetchRes.json();
            if (!fetchRes.ok) {
                return navigate(
                    `/auth?t=sign_in&return=${window.location.href}`,
                    {
                        state: {
                            errorMessage: json
                                ? json.message
                                : 'Vui lòng thử đăng nhập lại trong giây lát.',
                        },
                    },
                );
            }
            if (rememberPwd) {
                window.localStorage.setItem('token', json.r_token);
                setCookie('token', json.a_token, {
                    maxAge: 18000, // 5 hour
                    sameSite: 'none',
                    secure: true,
                    path: '/',
                });
            } else {
                setCookie('token', json.a_token, {
                    sameSite: 'none',
                    secure: true,
                    path: '/',
                });
            }
            dispatchAuthStore && dispatchAuthStore(loginUser(true, json.user));
            // reloadPage();
        } catch (error) {
            navigate(`/auth?t=sign_in&return=${window.location.href}`, {
                state: {
                    errorMessage: 'Vui lòng thử đăng nhập lại trong giây lát.',
                },
            });
        }
    };
    const reloadPage = () => {
        return navigate(0);
    };
    return (
        <div
            id="header"
            className="fixed z-50 w-full shadow-sm h-[80px] flex items-center dark:bg-[#222] bg-white border-b-[1px] dark:border-[#555]"
        >
            <Container className="flex flex-nowrap justify-between px-4 lg:px-8 ">
                <div className="z-10 inline-flex items-center">
                    <LogoIcon />
                </div>
                <div className="z-10 items-center gap-4 hidden lg:inline-flex">
                    <div className="flex flex-col items-end">
                        <label
                            htmlFor="account-input"
                            className="border hover:border-gray-400 p-2 rounded-md cursor-text dark:bg-[#444] border-[#666]"
                        >
                            <input
                                onChange={handleChangeInput}
                                name="account"
                                id="account-input"
                                className="outline-none leading-none bg-transparent text-black dark:text-white dark:placeholder:text-white"
                                type="text"
                                placeholder="Email, sđt hoặc tên tài khoản"
                            />
                        </label>
                        <span className="pt-5 w-full"></span>
                    </div>

                    <div className="flex flex-col items-end">
                        <label
                            htmlFor="pwd-input"
                            className="border hover:border-gray-400 p-2 rounded-md cursor-text dark:bg-[#444] border-[#666]"
                        >
                            <input
                                onChange={handleChangeInput}
                                name="password"
                                id="pwd-input"
                                className="outline-none leading-none bg-transparent text-black dark:text-white dark:placeholder:text-white"
                                type="password"
                                placeholder="Mật khẩu"
                            />
                        </label>
                        <label
                            htmlFor="rememPwd-checkbox"
                            className="dark:text-white leading-none flex justify-center items-center mt-1"
                        >
                            Lưu tài khoản
                            <input
                                className="ml-2"
                                type="checkbox"
                                name="rememberPwd"
                                id="rememPwd-checkbox"
                            />
                        </label>
                    </div>
                    <button
                        onClick={throttleFunction(signIn, 3000)}
                        className="text-white bg-sky-400 border-b-[3px] hover:bg-[#0ea5e9] active:bg-[#0ea5e9] border-sky-700 py-2 px-6 rounded-2xl inline-flex font-NunitoBold"
                    >
                        Đăng nhập
                    </button>
                    <Link
                        to={`/auth?t=forgot`}
                        className="text-sky-400 hover:underline"
                    >
                        Quên tài khoản?
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default memo(LoginHeader);
