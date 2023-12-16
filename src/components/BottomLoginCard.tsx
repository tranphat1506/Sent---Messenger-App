import { Link } from 'react-router-dom';

type BottomLoginCardProps = {
    returnPage?: string;
};
const BottomLoginCard: React.FC<BottomLoginCardProps> = ({ returnPage }) => {
    return (
        <div className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] fixed bottom-0 left-0 w-screen h-[150px] dark:bg-[#222] bg-white flex justify-center flex-col">
            <h1 className="font-NunitoBold dark:text-white my-4 text-3xl text-center">
                MXH dành cho tất cả mọi người{', '}
                <span className="text-sky-400">SENT</span>
            </h1>
            <div className="gap-4 flex justify-center items-center">
                <Link
                    to={`/auth?t=sign_in&return=${returnPage}`}
                    className="text-white bg-sky-400 border-b-[3px] hover:bg-[#0ea5e9] active:bg-[#0ea5e9] border-sky-700 py-2 px-6 rounded-lg inline-flex font-NunitoBold"
                >
                    Đăng nhập
                </Link>
                <p className="dark:text-white text-sm">hoặc</p>
                <Link
                    to={`/auth?t=sign_up&return=${returnPage}`}
                    className="text-white bg-[#f00b51] border-b-[3px] hover:bg-[#ec4779] active:bg-[#ec4779] border-[#a90034] py-2 px-6 rounded-lg inline-flex font-NunitoBold"
                >
                    Tạo tài khoản mới
                </Link>
            </div>
        </div>
    );
};

export default BottomLoginCard;
