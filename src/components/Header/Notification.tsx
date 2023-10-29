import { BiSolidBell } from 'react-icons/bi';
import { Tooltip, Badge } from '@mui/material';
type NotificationProps = {
    notiCount?: number;
};
const Notification: React.FC<NotificationProps> = ({ notiCount = 0 }) => {
    const path = window.location.pathname;
    if (
        path === '/notifications' ||
        path.split('/').includes('notifications')
    ) {
        // will unmount the component when in it page
        return <></>;
    }
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
                            '!font-NunitoBold !bg-sky-400 !text-white dark:!text-[#222]',
                    },
                }}
            >
                <button className="rounded-full dark:text-[#888888] dark:hover:bg-[#444444] dark:bg-[#1E1E1E] bg-[#00000008] hover:bg-[#00000020] active:scale-95 text-2xl text-[#444] p-2">
                    <BiSolidBell />
                </button>
            </Badge>
        </Tooltip>
    );
};

export default Notification;
