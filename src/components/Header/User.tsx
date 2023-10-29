import { Avatar, Tooltip } from '@mui/material';
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
                <div className="absolute hover:bg-[#00000020] w-[40px] h-[40px] top-0 rounded-full"></div>
            </button>
        </Tooltip>
    );
};

export default UserButton;
