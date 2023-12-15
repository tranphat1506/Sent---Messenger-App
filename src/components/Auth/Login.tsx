import clsx from 'clsx';
import styles from './Auth.module.scss';
import { Link, useNavigate, To } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '@/src/hooks/useAuthStore';
import { loginUser } from '@/src/contexts/Auth/actions';
import ReCAPTCHA from 'reaptcha';
import FontIcon from '../Common/FontIcon';
import { FacebookSvg, GoogleSvg } from '../Svg/';
import { API_ENDPOINT, BE_PORT, BE_URL } from '@/src/constant';
import { throttleFunction } from '@/src/utils/CommonFunction';
import { CircularProgress } from '@mui/material';
export type AuthComponentProps = {
    returnPage: To | null;
};
const Login: React.FC<AuthComponentProps> = ({ returnPage }) => {
    const navigate = useNavigate();
    const [authStore, dispatchAuthStore] = useAuthStore();
    useEffect(() => {
        if (authStore?.isLogging) {
            return navigate(returnPage || '/');
        }
    }, [authStore]);
    const [progressing, setProgressing] = useState(false);
    const [captcha, setCaptcha] = useState(false);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPwd, setRememberPwd] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleVerifyCaptcha = () => {
        return setCaptcha(true);
    };
    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        const value = e.target.value;
        switch (inputName) {
            case 'username':
                setAccount(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'remember_pwd':
                setRememberPwd(e.target.checked);
                break;
            default:
                throw Error('Invalid input name!');
        }
    };
    const signIn = async () => {
        if (progressing) return false;
        setProgressing(true);
        if (!account || !password || !captcha) return false;
        try {
            const url = `${BE_URL}:${BE_PORT}${API_ENDPOINT.user_login}`;
            const fetchRes = await fetch(url, {
                method: 'POST',
                credentials: 'include',
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
            setProgressing(false);
            if (!fetchRes.ok) {
                setErrorMessage(json.message);
                return;
            }
            dispatchAuthStore && dispatchAuthStore(loginUser(true, json.user));
            // return back();
        } catch (error) {
            setProgressing(false);
            setErrorMessage('Vui lòng thử đăng nhập lại trong giây lát.');
        }
        // dispatchAuthStore && dispatchAuthStore(payload);
    };
    const back = () => {
        return navigate('/');
    };
    return (
        <>
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.btn)} onClick={back}>
                    <FontIcon size={24} logoName={'close'}></FontIcon>
                </div>
                <Link
                    className={clsx(styles.btn, styles.btn__sign_up)}
                    to={`/auth?t=sign_up&return=${returnPage}`}
                >
                    Đăng ký
                </Link>
            </div>
            <div className={clsx(styles.authForm)}>
                <div className={clsx(styles.authForm__container)}>
                    <span className={clsx(styles.authForm__title, '!mb-8')}>
                        Đăng nhập
                    </span>
                    <div className={clsx(styles.authForm__content)}>
                        {!!errorMessage && (
                            <span
                                className={clsx(
                                    styles.message__item,
                                    styles.message__deny,
                                    styles['message--show'],
                                    '!mt-4',
                                )}
                            >
                                {errorMessage}
                            </span>
                        )}
                        <div
                            className={clsx(
                                styles.content__account_input,
                                styles.content__input,
                            )}
                        >
                            <FontIcon
                                fontSize={30}
                                logoName={'badge'}
                                fill={1}
                                color={'#3e3e3e'}
                                className={clsx(styles.icon)}
                            />
                            <input
                                onChange={handleOnChangeInput}
                                id="account-input"
                                name="username"
                                autoComplete="username"
                                type="text"
                                placeholder="Email, sđt hoặc tên tài khoản"
                            />
                        </div>
                        <div
                            className={clsx(
                                styles.content__password_input,
                                styles.content__input,
                            )}
                        >
                            <FontIcon
                                fontSize={30}
                                logoName={'key'}
                                fill={1}
                                color={'#3e3e3e'}
                                className={clsx(styles.icon)}
                            />
                            <input
                                onChange={handleOnChangeInput}
                                id="password-input"
                                name="password"
                                autoComplete="password"
                                type="password"
                                placeholder="Mật khẩu"
                            />
                            <Link
                                className={clsx(
                                    styles['icon--last'],
                                    styles.content__forgot_password,
                                )}
                                to={`/auth?t=forgot&return=${returnPage}`}
                            >
                                Quên?
                            </Link>
                        </div>
                        <div
                            className={clsx(styles.content__checkbox)}
                            title="
                            Lưu mật khẩu sẽ không lưu bất kì thông tin tài khoản nào trên trình duyệt.
                            Nó sẽ lưu mã token được mã hoá để xác minh tài khoản và tồn tại trong 30 ngày!
                            "
                        >
                            <input
                                id="remember_pwd-input"
                                name="remember_pwd"
                                type="checkbox"
                                onChange={handleOnChangeInput}
                            />
                            <label htmlFor="remember_pwd-input">
                                Lưu tài khoản 30 ngày
                            </label>
                        </div>
                        <div
                            className={clsx(
                                styles.content__checkbox,
                                'justify-center',
                            )}
                            title=""
                        >
                            <ReCAPTCHA
                                sitekey="6LfV49knAAAAANk6u35i3cgbbn8EsK9IEqVNEJ5t"
                                onVerify={handleVerifyCaptcha}
                            ></ReCAPTCHA>
                        </div>
                        <button
                            onClick={throttleFunction(signIn, 2000)}
                            className={clsx(
                                'btn',
                                styles.btn,
                                styles.btn__submit,
                                styles.btn__sign_in,
                            )}
                        >
                            {progressing ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                        <div className={clsx(styles.content__quickSignIn)}>
                            <div className={clsx(styles.content__split)}>
                                <span className={clsx(styles.bar)}></span>
                                <span className={clsx(styles.title)}>hoặc</span>
                                <span className={clsx(styles.bar)}></span>
                            </div>
                            <div className={clsx(styles.options)}>
                                <button
                                    className={clsx(
                                        'btn',
                                        styles.btn,
                                        styles.btn__facebook,
                                    )}
                                >
                                    <FacebookSvg width={30}></FacebookSvg>
                                    Facebook
                                </button>
                                <button
                                    className={clsx(
                                        'btn',
                                        styles.btn,
                                        styles.btn__google,
                                    )}
                                >
                                    <GoogleSvg width={30}></GoogleSvg>
                                    Google
                                </button>
                            </div>
                        </div>
                        <div className={clsx(styles.content__privacy)}>
                            Bằng cách tiếp tục, bạn đồng ý với{' '}
                            <Link to={'/help/terms'}>Điều khoản Sử dụng</Link>{' '}
                            và{' '}
                            <Link to={'/help/privacy'}>
                                Chính sách Quyền riêng tư
                            </Link>{' '}
                            của chúng tôi.
                        </div>
                        <div className={clsx(styles.content__privacy)}>
                            Trang này được bảo vệ bởi tập đoàn reCAPTCHA và theo{' '}
                            <a href="https://policies.google.com/privacy">
                                Chính sách bảo mật
                            </a>{' '}
                            và{' '}
                            <a href="https://policies.google.com/terms">
                                Điều khoản dịch vụ
                            </a>{' '}
                            của Google.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
