import clsx from 'clsx';
import styles from './Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import useAuthStore from '@/src/hooks/useAuthStore';
import ReCAPTCHA from 'reaptcha';
import FontIcon from '../Common/FontIcon';
import { FacebookSvg, GoogleSvg } from '../Svg/';
import { AuthComponentProps } from './Login';
import { API_ENDPOINT, BE_PORT, BE_URL } from '@/src/constant';
import { throttleFunction } from '@/src/utils/CommonFunction';
import { CircularProgress } from '@mui/material';
import { logoutUser } from '@/src/contexts/Auth/actions';
import { useCookies } from 'react-cookie';
const defaultPlaceholder = {
    email: 'Địa chỉ email (*)',
    username: 'Tên tài khoản (*)',
    password: 'Mật khẩu (*)',
    displayName: 'Tên hiển thị (*)',
};
const monthDefine = [
    'Một',
    'Hai',
    'Ba',
    'Bốn',
    'Năm',
    'Sáu',
    'Bảy',
    'Tám',
    'Chín',
    'Mười',
    'Mười Một',
    'Mười Hai',
];
const sexDefine = ['Nữ', 'Nam', 'Khác'];
const today = new Date();
const maxAge = {
    day: 1,
    month: 1,
    year: 1905,
};
const minAge = {
    day: today.getUTCDate(),
    month: today.getUTCMonth() + 1,
    year: today.getUTCFullYear() - 11,
};
const Register: React.FC<AuthComponentProps> = ({
    returnPage,
    initErrorMessage = '',
}) => {
    const navigate = useNavigate();
    const [progressing, setProgressing] = useState(false);
    const [, dispatchAuthStore] = useAuthStore();
    const [cookies, setCookie] = useCookies(['token']);
    useEffect(() => {
        const a_token = cookies.token;
        const urlCheck = `${BE_URL}:${BE_PORT}${API_ENDPOINT.check_logging}`;
        const checkIsLogging = fetch(urlCheck, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`,
            },
        });
        checkIsLogging
            .then(async (r) => {
                if (!r.ok) {
                    const r_token =
                        window.localStorage.getItem('token') || undefined;
                    if (r_token) {
                        const urlRefreshToken = `${BE_URL}:${BE_PORT}${API_ENDPOINT.refresh_token}`;
                        const res = await fetch(urlRefreshToken, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${r_token}`,
                            },
                        });
                        const { token } = await res.json();
                        if (token) {
                            setCookie('token', token, {
                                maxAge: 18000, // 5 hour
                                sameSite: 'none',
                                secure: true,
                                path: '/',
                            });
                            back();
                        } else throw new Error();
                    } else throw new Error();
                } else {
                    back();
                }
            })
            .catch(() => {
                dispatchAuthStore && dispatchAuthStore(logoutUser());
            });
    }, []);
    const [sex, setSex] = useState('1');
    const [birth, setBirth] = useState(minAge);
    // Set default birth
    useEffect(() => {
        setBirth({
            day: today.getUTCDate(),
            month: today.getUTCMonth(),
            year: today.getUTCFullYear(),
        });
    }, []);
    const [captcha, setCaptcha] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [acceptEmail, setAcceptEmail] = useState(false);
    const [globalErrorMessage, setGlobalErrorMessage] =
        useState(initErrorMessage);

    const [onFocusPassword, setOnFocusPassword] = useState(false);
    const changeFocus = (inputName: string, status: boolean) => {
        switch (inputName) {
            case 'password':
                setOnFocusPassword(status);
                break;
            default:
                break;
        }
    };
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        changeFocus(inputName, true);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        changeFocus(inputName, false);
    };

    const acceptForSignUp = useRef({
        sex: !!sex,
        displayName: !!displayName,
        email: !!email,
        username: !!username,
        password: !!password,
        acceptEmail: !!acceptEmail,
        captcha: !!captcha,
        birth: !!(birth.day && birth.month && birth.year),
    });
    const accept = Object.values(acceptForSignUp.current).every(
        (i) => i == true,
    );
    const handleVerifyCaptcha = () => {
        acceptForSignUp.current.captcha = true;
        return setCaptcha(true);
    };
    const signUp = async () => {
        if (progressing || !accept) return false;
        setProgressing(true);
        try {
            const data = {
                birth: birth,
                sex: {
                    display: sexDefine[Number(sex)],
                    info: Number(sex),
                },
                display_name: displayName,
                user_name: username,
                password: password,
                email: email,
            };
            const url = `${BE_URL}:${BE_PORT}${API_ENDPOINT.user_signup}`;
            const r = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await r.json();
            setProgressing(false);
            if (!r.ok) {
                setGlobalErrorMessage(json.message);
            }
            return back();
        } catch (error) {
            setProgressing(false);
            setGlobalErrorMessage('Vui lòng thử lại trong giây lát.');
        }
    };
    const listRef = useRef<React.LegacyRef<HTMLDivElement>[] | undefined>([
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]);
    const [
        displayNameRef,
        emailRef,
        usernameRef,
        pwdRef,
        acpEmailRef,
        dBirthRef,
        mBirthRef,
        yBirthRef,
        sexRef,
    ]: any = useMemo(() => {
        return listRef.current;
    }, [listRef]);
    const errorMessage = (
        ref: React.RefObject<HTMLDivElement>,
        message = '',
        reset = 0,
        type = 'input',
    ) => {
        if (!ref || !ref.current) return false;
        if (type === 'input') {
            if (reset) {
                return ref.current.classList.remove(styles.input__error);
            }
            (ref.current.childNodes[1] as HTMLInputElement).placeholder =
                message;
            return ref.current.classList.add(styles.input__error);
        }
        if (type === 'checkbox') {
            if (reset) {
                return ref.current.classList.remove(styles.input__error);
            }
            return ref.current.classList.add(styles.input__error);
        }
    };
    const successMessage = (
        ref: React.RefObject<HTMLDivElement>,
        reset = 0,
    ) => {
        if (!ref || !ref.current) return false;
        if (reset) {
            return ref.current.classList.remove(styles.input__success);
        }
        return ref.current.classList.add(styles.input__success);
    };
    const handleOnChangeInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const inputName = e.target.name;
        const value = e.target.value;
        switch (inputName) {
            case 'displayName':
                setDisplayName(value);
                if (!value) {
                    acceptForSignUp.current.displayName = false;
                    successMessage(displayNameRef, 1);
                    errorMessage(
                        displayNameRef,
                        'Tên hiển thị không được để trống.',
                    );
                    break;
                }
                acceptForSignUp.current.displayName = value.length >= 8;
                errorMessage(displayNameRef, '', 1);
                successMessage(displayNameRef);
                break;
            case 'email':
                setEmail(value);
                if (!value) {
                    acceptForSignUp.current.email = false;
                    successMessage(emailRef, 1);
                    errorMessage(emailRef, 'Email không được trống.');
                    break;
                }
                acceptForSignUp.current.email = RegExp(
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm,
                ).test(value);
                errorMessage(emailRef, '', 1);
                successMessage(emailRef);
                break;
            case 'username':
                setUsername(value);
                if (!value) {
                    acceptForSignUp.current.username = false;
                    successMessage(usernameRef, 1);
                    errorMessage(
                        usernameRef,
                        'Tên người dùng không được trống.',
                    );
                    break;
                }
                acceptForSignUp.current.username = RegExp(
                    /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{6,32}$/,
                ).test(value);
                successMessage(usernameRef);
                errorMessage(usernameRef, '', 1);
                break;
            case 'password':
                setPassword(value);
                if (!value) {
                    acceptForSignUp.current.password = false;
                    successMessage(pwdRef, 1);
                    errorMessage(pwdRef, 'Mật khẩu không được trống.');
                    break;
                }
                acceptForSignUp.current.password = RegExp(
                    /^(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_]).{8,}$/,
                ).test(value);
                successMessage(pwdRef);
                errorMessage(pwdRef, '', 1);
                break;
            case 'sex':
                setSex(value);
                acceptForSignUp.current.sex = true;
                break;
            case 'dayOfBirth':
                setBirth({ ...birth, day: Number(value) });
                if (birth.day && birth.month && birth.year) {
                    acceptForSignUp.current.birth = true;
                    break;
                }
                break;
            case 'monthOfBirth':
                setBirth({ ...birth, month: Number(value) });
                if (birth.day && birth.month && birth.year) {
                    acceptForSignUp.current.birth = true;
                    break;
                }
                break;
            case 'yearOfBirth':
                setBirth({ ...birth, year: Number(value) });
                if (birth.day && birth.month && birth.year) {
                    acceptForSignUp.current.birth = true;
                    break;
                }
                break;
            default:
                throw Error('Invalid input name!');
        }
    };
    const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        const value = e.target.checked;
        switch (inputName) {
            case 'accept_email':
                acceptForSignUp.current.acceptEmail = !!value;
                setAcceptEmail(value);
                break;
            default:
                throw Error('Invalid checkbox!');
        }
    };
    useEffect(() => {
        if (!!displayName) {
            if (!acceptForSignUp.current.displayName) {
                successMessage(displayNameRef, 1);
                errorMessage(
                    displayNameRef,
                    'Tên hiển thị phải tối thiểu 8 kí tự.',
                );
            }
        }
    }, [displayName, acceptForSignUp.current]);
    useEffect(() => {
        if (!!email) {
            if (!acceptForSignUp.current.email) {
                successMessage(emailRef, 1);
                errorMessage(emailRef, 'Email không hợp lệ.');
            }
        }
    }, [email]);
    useEffect(() => {
        if (!!username) {
            if (!acceptForSignUp.current.username) {
                successMessage(usernameRef, 1);
                errorMessage(usernameRef, 'Tên người dùng không hợp lệ.');
            }
        }
    }, [username]);
    useEffect(() => {
        if (!!password) {
            if (!acceptForSignUp.current.password) {
                successMessage(pwdRef, 1);
                errorMessage(pwdRef, 'Mật khẩu không hợp lệ.');
            }
        }
    }, [password]);

    const back = () => {
        return returnPage && navigate(returnPage);
    };

    const backToHome = () => {
        navigate('/');
    };
    return (
        <>
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.btn)} onClick={backToHome}>
                    <FontIcon size={24} logoName={'close'}></FontIcon>
                </div>
                <Link
                    className={clsx(styles.btn, styles.btn__sign_in)}
                    to={`/auth?t=sign_in&return=${returnPage}`}
                >
                    Đăng nhập
                </Link>
            </div>
            <div className={clsx(styles.authForm)}>
                <div className={clsx(styles.authForm__container)}>
                    <span className={clsx(styles.authForm__title)}>
                        Đăng ký
                    </span>
                    <span
                        className={clsx(
                            styles.message__item,
                            styles.message__gray,
                            styles['message--show'],
                        )}
                    >
                        (*) Bắt buộc
                    </span>
                    {!!globalErrorMessage && (
                        <span
                            className={clsx(
                                styles.message__item,
                                styles.message__deny,
                                styles['message--show'],
                                '!mt-4',
                            )}
                        >
                            {globalErrorMessage}
                        </span>
                    )}
                    <div className={clsx(styles.authForm__content)}>
                        <div className="flex gap-2">
                            <div
                                ref={displayNameRef}
                                className={clsx(
                                    styles.content__displayName_input,
                                    styles.content__input,
                                )}
                            >
                                <label htmlFor="displayName-input">
                                    <FontIcon
                                        fontSize={30}
                                        logoName={'person'}
                                        fill={1}
                                        color={'#3e3e3e'}
                                        className={clsx(styles.icon)}
                                    />
                                </label>
                                <input
                                    autoComplete="name"
                                    onChange={handleOnChangeInput}
                                    id="displayName-input"
                                    name="displayName"
                                    type="text"
                                    placeholder={defaultPlaceholder.displayName}
                                />
                            </div>
                            <div
                                ref={sexRef}
                                className={clsx(
                                    styles.content__sex_input,
                                    styles.content__input,
                                    'flex-col !items-start basis-2/5',
                                )}
                            >
                                <span className="text-sm leading-none text-gray-500">
                                    Giới tính
                                </span>
                                <select
                                    onChange={handleOnChangeInput}
                                    className="bg-transparent w-full"
                                    name="sex"
                                    id="sex-input"
                                    defaultValue={sex}
                                >
                                    {sexDefine.map((value, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {value}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div
                            ref={emailRef}
                            className={clsx(
                                styles.content__email_input,
                                styles.content__input,
                            )}
                        >
                            <label htmlFor="email-input">
                                <FontIcon
                                    fontSize={30}
                                    logoName={'alternate_email'}
                                    fill={1}
                                    color={'#3e3e3e'}
                                    className={clsx(styles.icon)}
                                />
                            </label>
                            <input
                                autoComplete="email"
                                onChange={handleOnChangeInput}
                                id="email-input"
                                name="email"
                                type="text"
                                placeholder={defaultPlaceholder.email}
                            />
                        </div>
                        <div
                            ref={usernameRef}
                            className={clsx(
                                styles.content__username_input,
                                styles.content__input,
                            )}
                        >
                            <label htmlFor="username-input">
                                <FontIcon
                                    fontSize={30}
                                    logoName={'badge'}
                                    fill={1}
                                    color={'#3e3e3e'}
                                    className={clsx(styles.icon)}
                                />
                            </label>
                            <input
                                minLength={6}
                                maxLength={24}
                                onChange={handleOnChangeInput}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                id="username-input"
                                name="username"
                                type="text"
                                placeholder={defaultPlaceholder.username}
                                autoComplete="username"
                            />
                        </div>
                        <div
                            ref={pwdRef}
                            className={clsx(
                                styles.content__password_input,
                                styles.content__input,
                            )}
                        >
                            <label htmlFor="password-input">
                                <FontIcon
                                    fontSize={30}
                                    logoName={'key'}
                                    fill={1}
                                    color={'#3e3e3e'}
                                    className={clsx(styles.icon)}
                                />
                            </label>
                            <input
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleOnChangeInput}
                                id="password-input"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder={defaultPlaceholder.password}
                            />
                        </div>
                        {onFocusPassword && (
                            <span
                                className={clsx(styles.message__item, {
                                    [styles['message--show']]: 1,
                                })}
                            >
                                Mật khẩu phải:
                                <span
                                    className={clsx(styles.sub__message, {
                                        [styles.message__accept]:
                                            password.length >= 8,
                                    })}
                                >
                                    * Từ 8 kí tự trở lên.
                                </span>
                                <span
                                    className={clsx(styles.sub__message, {
                                        [styles.message__accept]: RegExp(
                                            /(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_])/,
                                        ).test(password),
                                    })}
                                >
                                    * Có ít nhất 1 kí tự đặc biệt, 1 chữ số, 1
                                    chữ in hoa.
                                </span>
                            </span>
                        )}
                        <span
                            className={clsx(
                                styles.message__item,
                                styles.message__gray,
                                styles['message--show'],
                                '!mt-4',
                            )}
                        >
                            (*) Sinh nhật
                        </span>
                        <div className="flex gap-2">
                            <div
                                className={clsx(
                                    styles.content__birth_input,
                                    styles.content__input,
                                    'flex flex-col !items-start !mt-2',
                                )}
                            >
                                <span className="text-sm leading-none text-gray-500">
                                    Ngày
                                </span>
                                <select
                                    ref={dBirthRef}
                                    className="bg-transparent w-full"
                                    name="dayOfBirth"
                                    id="dayOfBirth-input"
                                    autoComplete="bday-day"
                                    onChange={handleOnChangeInput}
                                    defaultValue={birth.day}
                                >
                                    {[...Array(31)].map((_, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                {index + 1}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div
                                ref={mBirthRef}
                                className={clsx(
                                    styles.content__birth_input,
                                    styles.content__input,
                                    'flex flex-col !items-start !mt-2',
                                )}
                            >
                                <span className="text-sm leading-none text-gray-500">
                                    Tháng
                                </span>
                                <select
                                    className="bg-transparent w-full"
                                    name="monthOfBirth"
                                    id="monthOfBirth-input"
                                    autoComplete="bday-month"
                                    onChange={handleOnChangeInput}
                                    defaultValue={birth.month}
                                >
                                    {[
                                        monthDefine.map(
                                            (monthInString, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={index + 1}
                                                    >
                                                        {monthInString}
                                                    </option>
                                                );
                                            },
                                        ),
                                    ]}
                                </select>
                            </div>
                            <div
                                ref={yBirthRef}
                                className={clsx(
                                    styles.content__birth_input,
                                    styles.content__input,
                                    'flex flex-col !items-start !mt-2',
                                )}
                            >
                                <span className="text-sm leading-none text-gray-500">
                                    Năm
                                </span>
                                <select
                                    className="bg-transparent w-full"
                                    name="yearOfBirth"
                                    id="yearOfBirth-input"
                                    autoComplete="bday-year"
                                    onChange={handleOnChangeInput}
                                    defaultValue={birth.year}
                                >
                                    {[...Array(minAge.year)]
                                        .splice(maxAge.year)
                                        .map((_, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={
                                                        maxAge.year + index + 1
                                                    }
                                                >
                                                    {maxAge.year + index + 1}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div
                            ref={acpEmailRef}
                            className={clsx(styles.content__checkbox)}
                            title=""
                        >
                            <input
                                id="accept_email"
                                name="accept_email"
                                type="checkbox"
                                onChange={handleOnChangeCheckbox}
                            />
                            <label htmlFor="accept_email">
                                (*) Các thông tin cập nhật tài khoản được gửi
                                đến email của bạn.
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
                            onClick={throttleFunction(signUp, 2000)}
                            className={clsx(
                                'btn',
                                styles.btn,
                                styles.btn__submit,
                                styles.btn__sign_up,
                                {
                                    [styles.lock]: !accept,
                                },
                            )}
                        >
                            {progressing ? (
                                <CircularProgress color="inherit" />
                            ) : (
                                'Đăng ký'
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

export default Register;
