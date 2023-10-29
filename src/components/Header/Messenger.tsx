import { DEFAULT_TITLE } from '@/src/const';
import { Tooltip, Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';

import MessageSoundEffectUrl from '@/src/assets/sounds/message-ting.mp3';
const MessageSoundEffect = new Audio(MessageSoundEffectUrl);
MessageSoundEffect.volume = 0.3;

type NotifyState = {
    message?: string;
    status?: boolean;
};
type MessengerProps = {
    on?: boolean;
};
const Messenger: React.FC<MessengerProps> = ({ on = false }) => {
    const path = window.location.pathname;
    const [notify, setNotify] = useState<NotifyState>({
        status: on,
        message: 'Minh Thy đã gửi một tin nhắn.',
    });

    // Effect for notify
    useEffect(() => {
        let id: NodeJS.Timeout;
        if (!notify.status) {
            document.title = DEFAULT_TITLE;
        } else {
            MessageSoundEffect.play();
            let messageNoti: {
                message: string | undefined;
                isDefault: boolean;
            } = { message: notify.message, isDefault: false };
            id = setInterval(() => {
                if (messageNoti.isDefault) {
                    messageNoti.message = notify.message;
                    messageNoti.isDefault = false;
                } else {
                    messageNoti.message = DEFAULT_TITLE;
                    messageNoti.isDefault = true;
                }
                document.title = messageNoti.message || DEFAULT_TITLE;
            }, 2000);
        }
        return () => {
            clearInterval(id);
        };
    }, [notify]);

    const toogleNotify = (status?: boolean, message?: string) => () => {
        setNotify({ message: message, status: status });
    };

    if (path === '/messages' || path.split('/').includes('messages')) {
        // will unmount the component when in it page
        return <></>;
    }
    return (
        <Tooltip
            title="Tin nhắn"
            slotProps={{
                tooltip: {
                    className: '!font-NunitoRegular !text-sm !bg-[#333]',
                },
            }}
        >
            <Badge
                invisible={!notify.status}
                variant="dot"
                slotProps={{
                    badge: {
                        className: '!font-NunitoRegular !bg-sky-400',
                    },
                }}
            >
                <button
                    onClick={toogleNotify(false, undefined)}
                    className="dark:text-[#888888] dark:hover:bg-[#444444] dark:bg-[#1E1E1E] rounded-full bg-[#00000008] hover:bg-[#00000020] active:scale-95 text-2xl text-[#444] p-2"
                >
                    <BiSolidMessageSquareDetail />
                </button>
            </Badge>
        </Tooltip>
    );
};

export default Messenger;
