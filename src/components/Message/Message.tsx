import { Time2MessageTitleTime } from '@/src/utils/FormatTime';
import { Avatar, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { MdRadioButtonUnchecked } from 'react-icons/md';
import { Fragment } from 'react';

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
const Message: React.FC<MessageProps> = ({
    message = '',
    time = '',
    tooltipClassName,
    className = '',
    seenInfo,
    members,
    isMyMessage,
    isLastMessage,
    myId,
}) => {
    const cvtTime = Time2MessageTitleTime(time);
    return (
        <>
            <Tooltip
                enterDelay={300}
                enterNextDelay={300}
                slotProps={{
                    tooltip: {
                        className: clsx(
                            '!font-NunitoRegular !text-sm !bg-[#333]',
                            tooltipClassName,
                        ),
                    },
                }}
                title={cvtTime}
            >
                <p
                    className={clsx(
                        'message dark:bg-[#323232] dark:text-white bg-[#00000017] leading-tight p-3 rounded-2xl text-[0.9rem] max-w-[50%] w-max',
                        className,
                    )}
                >
                    {message}
                </p>
            </Tooltip>
            {seenInfo?.status === 'sending' && isMyMessage && (
                <Tooltip
                    enterDelay={300}
                    enterNextDelay={300}
                    slotProps={{
                        tooltip: {
                            className: clsx(
                                '!font-NunitoRegular !text-sm !bg-[#333]',
                                tooltipClassName,
                            ),
                        },
                    }}
                    title={'Đang gửi'}
                >
                    <span className="status-icon text-sm dark:text-white">
                        <MdRadioButtonUnchecked />
                    </span>
                </Tooltip>
            )}
            {seenInfo?.status === 'sent1' && isMyMessage && isLastMessage && (
                <Tooltip
                    enterDelay={300}
                    enterNextDelay={300}
                    slotProps={{
                        tooltip: {
                            className: clsx(
                                '!font-NunitoRegular !text-sm !bg-[#333]',
                                tooltipClassName,
                            ),
                        },
                    }}
                    title={cvtTime}
                >
                    <span className="status-icon text-sm dark:text-white">
                        <HiCheckCircle />
                    </span>
                </Tooltip>
            )}
            {seenInfo?.status === 'sent2' && isMyMessage && isLastMessage && (
                <Tooltip
                    enterDelay={300}
                    enterNextDelay={300}
                    slotProps={{
                        tooltip: {
                            className: clsx(
                                '!font-NunitoRegular !text-sm !bg-[#333]',
                                tooltipClassName,
                            ),
                        },
                    }}
                    title={cvtTime}
                >
                    <span className="status-icon text-sm dark:text-white">
                        <HiOutlineCheckCircle />
                    </span>
                </Tooltip>
            )}
            {seenInfo?.status === 'seen' && (
                <span className="flex justify-end">
                    {seenInfo.seenList?.map((detail: any, index) => {
                        const seenUser = members[detail?.member_id];
                        if (!seenUser || detail?.member_id === myId)
                            return <Fragment key={index}></Fragment>;
                        return (
                            <Tooltip
                                key={index}
                                enterDelay={300}
                                enterNextDelay={300}
                                slotProps={{
                                    tooltip: {
                                        className: clsx(
                                            '!font-NunitoRegular !text-sm !bg-[#333]',
                                            tooltipClassName,
                                        ),
                                    },
                                }}
                                title={clsx(
                                    seenUser.display_name,
                                    'Đã xem lúc',
                                    cvtTime,
                                )}
                                className="mr-1 mt-1"
                            >
                                <Avatar
                                    key={index}
                                    src={String(seenUser.avt_src)}
                                    alt=""
                                    className="!w-4 !h-4"
                                />
                            </Tooltip>
                        );
                    })}
                </span>
            )}
        </>
    );
};

export default Message;
