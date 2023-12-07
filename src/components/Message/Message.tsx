import { Time2MessageTitleTime } from '@/src/utils/FormatTime';
import { Tooltip } from '@mui/material';
import clsx from 'clsx';
import SeenStatus from './SeenStatus';

type MessageProps = {
    isMyMessage?: boolean;
    members: any;
    message: string;
    time: string | number;
    tooltipClassName?: string;
    className?: string;
    seenInfo?: {
        status: 'sending' | 'sent1' | 'sent2' | 'seen';
        seenList?: string[];
    };
    isLastMessage?: boolean;
    myId?: string;
};
const Message: React.FC<MessageProps> = (props) => {
    const cvtTime = Time2MessageTitleTime(props.time);
    return (
        <>
            <Tooltip
                enterDelay={300}
                enterNextDelay={300}
                slotProps={{
                    tooltip: {
                        className: clsx(
                            '!font-NunitoRegular !text-sm !bg-[#333]',
                            props.tooltipClassName,
                        ),
                    },
                }}
                title={cvtTime}
            >
                <p
                    className={clsx(
                        'dark:bg-[#323232] dark:text-white bg-[#00000017] leading-tight p-3 rounded-2xl text-[0.9rem] max-w-[50%] w-max',
                        props.className,
                    )}
                >
                    {props.message}
                </p>
            </Tooltip>
            <SeenStatus {...props} time={cvtTime} />
        </>
    );
};

export default Message;
