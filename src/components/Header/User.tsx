import { Avatar, Tooltip } from '@mui/material';
import { BiChevronDown } from 'react-icons/bi';
type UserButtonProps = {
    avatarSrc?: string;
    avatarAlt?: string;
};
const UserButton: React.FC<UserButtonProps> = ({
    avatarAlt,
    avatarSrc = '/default-avt.png',
}) => {
    return (
        <Tooltip
            title="Tài khoản"
            slotProps={{
                tooltip: {
                    className: '!font-NunitoRegular !text-sm !bg-[#333]',
                },
            }}
        >
            <button className="relative active:scale-95 rounded-full">
                <Avatar src={avatarSrc} alt={avatarAlt} />
                <div className="absolute hover:bg-[#00000020] w-[40px] h-[40px] top-0 rounded-full">
                    <div className="absolute bg-[#fff] dark:bg-[#222] w-[18px] h-[18px] bottom-0 right-0 rounded-full flex justify-center items-center">
                        <span className="bg-[#cccccc55] dark:text-white dark:bg-[#696969ae] rounded-full text-[12px]">
                            <BiChevronDown />
                        </span>
                    </div>
                </div>
            </button>
        </Tooltip>
    );
};

export default UserButton;
