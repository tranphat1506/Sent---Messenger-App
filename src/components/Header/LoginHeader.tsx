import { Link } from 'react-router-dom';
import Container from '../Common/Container';
import LogoIcon from '../Common/LogoIcon';

const LoginHeader = () => {
    return (
        <div
            id="header"
            className="fixed z-50 w-full shadow-sm h-[80px] flex items-center dark:bg-[#222] bg-white border-b-[1px] dark:border-[#555]"
        >
            <Container className="flex flex-nowrap justify-between px-4 lg:px-8 ">
                <div className="z-10 inline-flex items-center">
                    <LogoIcon className="max-[480px]:!hidden" />
                </div>
                <div className="z-10 inline-flex items-center gap-4">
                    <label
                        htmlFor="account-input"
                        className="border hover:border-gray-400 p-2 rounded-md cursor-text dark:bg-[#444] border-[#666]"
                    >
                        <input
                            id="account-input"
                            className="outline-none leading-none bg-transparent text-black dark:text-white dark:placeholder:text-white"
                            type="text"
                            placeholder="Email, sđt hoặc tên tài khoản"
                        />
                    </label>
                    <label
                        htmlFor="pwd-input"
                        className="border hover:border-gray-400 p-2 rounded-md cursor-text dark:bg-[#444] border-[#666]"
                    >
                        <input
                            id="pwd-input"
                            className="outline-none leading-none bg-transparent text-black dark:text-white dark:placeholder:text-white"
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </label>
                    <button className="text-white bg-sky-400 border-b-[3px] hover:bg-[#0ea5e9] active:bg-[#0ea5e9] border-sky-700 py-2 px-6 rounded-2xl inline-flex font-NunitoBold">
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

export default LoginHeader;
