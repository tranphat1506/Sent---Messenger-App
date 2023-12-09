import { IoCall, IoSend } from 'react-icons/io5';
import IconButton from '../Buttons/IconButton';
import { BsFileImage } from 'react-icons/bs';
import { MdKeyboardVoice } from 'react-icons/md';
import MessageDisplay from './MessageDisplay';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { Avatar, Typography } from '@mui/material';

type MessageContainerProps = {
    roomDetail?: any;
};

const MessageContainer: React.FC<MessageContainerProps> = ({ roomDetail }) => {
    if (!roomDetail) return <></>;
    const isAnyOnline = Object.keys(roomDetail.members).find((memberId) => {
        return (
            (roomDetail.members as any)[
                memberId as keyof typeof roomDetail.members
            ].is_online === true
        );
    });
    return (
        <div className="dark:bg-[#222] w-full h-[calc(100vh-80px)] flex flex-col">
            <div className="px-4 py-2 shadow-md flex justify-between">
                <button className="inline-flex gap-3 items-center p-2 font-NunitoMedium dark:hover:bg-[#ffffff17] hover:bg-[#00000017] rounded-xl">
                    <div className="relative">
                        <Avatar
                            className="!w-11 !h-11"
                            src={roomDetail?.avt_src}
                        />
                        {isAnyOnline && (
                            <div className="absolute bg-[#fff] dark:bg-[#222] w-[18px] h-[18px] bottom-0 right-0 rounded-full flex justify-center items-center">
                                <span className="bg-[#3e3e] rounded-full w-3 h-3"></span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center text-start flex-col">
                        {/* Name */}
                        <Typography
                            fontFamily={'inherit'}
                            fontSize={'1'}
                            lineHeight={1.2}
                            className="dark:text-white line-clamp-1 max-w-[200px]"
                        >
                            {roomDetail?.display_name || 'Người dùng'}
                        </Typography>
                        {/* Last online */}
                        <div className="inline-flex flex-nowrap w-full">
                            <Typography
                                fontSize={'0.85rem'}
                                fontFamily={'inherit'}
                                lineHeight={1.2}
                                className={'text-[#999]'}
                            >
                                {roomDetail?.is_group_chat
                                    ? `${
                                          Object.keys(roomDetail.members).length
                                      } thành viên`
                                    : 'Hoạt động 2 phút trước'}
                            </Typography>
                        </div>
                    </div>
                </button>
                <div className="flex items-center gap-4">
                    <IconButton
                        title="Bắt đầu cuộc gọi thoại"
                        icon={<IoCall />}
                        className="!text-sky-500 dark:bg-transparent bg-transparent"
                    />
                    <IconButton
                        title="Thông tin"
                        icon={<BiSolidInfoCircle />}
                        className="!text-sky-500 dark:bg-transparent bg-transparent"
                    />
                </div>
            </div>
            <div className="h-full overflow-x-hidden overflow-y-auto">
                <div className="message-display">
                    <MessageDisplay roomDetail={roomDetail} />
                </div>
            </div>
            <div className="flex mx-4 my-3 justify-between gap-4">
                <div className="flex gap-1">
                    <IconButton
                        title="Gửi tin nhắn thoại"
                        icon={<MdKeyboardVoice />}
                        className="dark:bg-transparent bg-transparent text-sky-500 dark:text-sky-500"
                    />
                    <IconButton
                        title="Gửi ảnh"
                        icon={<BsFileImage />}
                        className="dark:bg-transparent bg-transparent text-sky-500 dark:text-sky-500"
                    />
                </div>
                <div className="flex font-NunitoMedium gap-2 w-full">
                    <label
                        htmlFor="messenger-search"
                        className="flex w-full dark:bg-[#444] bg-[#F1F1F1] rounded-3xl items-center"
                    >
                        <input
                            placeholder="Aa"
                            className="outline-none rounded-3xl py-2 px-4 w-full bg-transparent dark:text-[#fff] placeholder:text-[#444] dark:placeholder:text-[#888]"
                            type="text"
                        />
                    </label>
                    <IconButton
                        title="Gửi"
                        icon={<IoSend />}
                        className="!bg-transparent text-sky-500 dark:text-sky-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
