import { Avatar, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { Fragment } from 'react';
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { MdRadioButtonUnchecked } from 'react-icons/md';

type SeenStatusProps = {
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
};
const SeenStatus: React.FC<SeenStatusProps> = ({
    time = '',
    tooltipClassName,
    seenInfo,
    members,
    isMyMessage,
    isLastMessage,
}) => {
    // Có người xem
    if (seenInfo?.status === 'seen') {
        return (
            <span className="flex justify-end">
                {seenInfo.seenList?.map((detail: any, index) => {
                    const seenUser = members[detail?.member_id];
                    if (!seenUser) return <Fragment key={index}></Fragment>;
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
                                time,
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
        );
    }
    // Đang gửi
    if (seenInfo?.status === 'sending' && isMyMessage) {
        return (
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
                <span className="text-sm dark:text-white">
                    <MdRadioButtonUnchecked />
                </span>
            </Tooltip>
        );
    }
    // Chưa ai nhận
    if (seenInfo?.status === 'sent1' && isMyMessage && isLastMessage) {
        return (
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
                title={time}
            >
                <span className="text-sm dark:text-white">
                    <HiOutlineCheckCircle />
                </span>
            </Tooltip>
        );
    }
    // Có trên 1 người nhận
    if (seenInfo?.status === 'sent2' && isMyMessage && isLastMessage) {
        return (
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
                title={time}
            >
                <span className="text-sm dark:text-white">
                    <HiCheckCircle />
                </span>
            </Tooltip>
        );
    }
    return <></>;
};

export default SeenStatus;
