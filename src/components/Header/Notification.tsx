import { BiSolidBell } from 'react-icons/bi';
import { Badge } from '@mui/material';
import IconButton from '../Buttons/IconButton';
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
        <Badge
            badgeContent={notiCount}
            slotProps={{
                badge: {
                    className:
                        '!font-NunitoBold !bg-sky-400 !text-white dark:!text-[#222]',
                },
            }}
        >
            <IconButton title="Thông báo" icon={<BiSolidBell />} />
        </Badge>
    );
};

export default Notification;
