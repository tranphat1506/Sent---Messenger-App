import { BiSolidBell } from 'react-icons/bi';
import { Tooltip, Badge } from '@mui/material';
type NotificationProps = {
    notiCount?: number;
};
const Notification: React.FC<NotificationProps> = ({ notiCount = 0 }) => {
    return (
        <Tooltip
            title="Thông báo"
            slotProps={{
                tooltip: {
                    className: '!font-NunitoRegular !text-sm !bg-[#333]',
                },
            }}
        >
            <Badge
                badgeContent={notiCount}
                slotProps={{
                    badge: {
                        className:
                            '!font-NunitoRegular !bg-sky-400 !text-white',
                    },
                }}
            >
                <button className="rounded-full bg-[#00000008] hover:bg-[#00000020] active:scale-95 text-2xl text-[#444] p-2">
                    <BiSolidBell />
                </button>
            </Badge>
        </Tooltip>
    );
};

export default Notification;
