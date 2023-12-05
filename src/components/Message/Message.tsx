import { Time2MessageTitleTime } from '@/src/utils/FormatTime';
import { Avatar, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { MdRadioButtonUnchecked } from 'react-icons/md';

type MessageProps = {
    message: string;
    time: string | number;
    tooltipClassName?: string;
    className?: string;
    state?: {
        status: 'sending' | 'sent1' | 'sent2' | 'seen';
        seenList?: string[];
    };
};
const Message: React.FC<MessageProps> = ({
    message = '',
    time = '',
    tooltipClassName,
    className = '',
    state,
}) => {
    const cvtTime = Time2MessageTitleTime(time);
    return (
        <>
            <Tooltip
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
            {state?.status === 'sending' && (
                <Tooltip
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
            {state?.status === 'sent1' && (
                <Tooltip
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
            {state?.status === 'sent2' && (
                <Tooltip
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
            {state?.status === 'seen' && (
                <span className="flex justify-end">
                    <Tooltip
                        slotProps={{
                            tooltip: {
                                className: clsx(
                                    '!font-NunitoRegular !text-sm !bg-[#333]',
                                    tooltipClassName,
                                ),
                            },
                        }}
                        title={clsx('Đã xem lúc', cvtTime)}
                    >
                        <span className="flex gap-[2px]">
                            {state.seenList?.map((avt, index) => {
                                return (
                                    <Avatar
                                        key={index}
                                        src={String(avt)}
                                        alt=""
                                        className="!w-4 !h-4"
                                    />
                                );
                            })}
                        </span>
                    </Tooltip>
                </span>
            )}
        </>
    );
};

export default Message;
