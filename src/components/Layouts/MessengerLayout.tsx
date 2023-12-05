import { MessageCard } from '@/src/pages/Messenger/page';
import { Avatar, Typography } from '@mui/material';
import { BiSolidInfoCircle } from 'react-icons/bi';
import IconButton from '../Buttons/IconButton';
import { IoCall, IoSend } from 'react-icons/io5';
import { MdKeyboardVoice } from 'react-icons/md';
import { BsFileImage } from 'react-icons/bs';
import MessageTime from '../Message/MessageTime';
import clsx from 'clsx';
import MessageGroup from '../Message/MessageGroup';
import Message from '../Message/Message';

import MessageFakeHistory from '../Message/MessageFakeHistory.json';
type MessengerLayoutProps = {
    MessengerTitle: React.ReactNode;
};
const MessengerLayout: React.FC<MessengerLayoutProps> = ({
    MessengerTitle,
}) => {
    return (
        <div className="w-screen h-auto flex justify-between">
            <div className="flex flex-col dark:bg-[#222] max-w-[380px] min-w-[380px] h-[calc(100vh-80px)] border-r-[1px] dark:border-[#555]">
                {MessengerTitle}
                <div className="h-full mx-2 my-2 overflow-auto">
                    <div className="mr-2 font-NunitoMedium">
                        <MessageCard
                            username="Trí Hải"
                            message="Hello em! Cho anh làm quen."
                            messageTime="5 phút"
                            disableNotify={true}
                            status={{ iAmSeen: false, seenList: [] }}
                        />
                    </div>
                </div>
            </div>
            <div className="dark:bg-[#222] w-full h-[calc(100vh-80px)] flex flex-col">
                <div className="px-4 py-1 shadow-md flex justify-between">
                    <button className="inline-flex gap-3 items-center p-2 font-NunitoMedium dark:hover:bg-[#ffffff17] hover:bg-[#00000017] rounded-xl">
                        <div className="relative">
                            <Avatar className="!w-11 !h-11" />
                            <div className="absolute bg-[#fff] dark:bg-[#222] w-[18px] h-[18px] bottom-0 right-0 rounded-full flex justify-center items-center">
                                <span className="bg-[#3e3e] rounded-full w-3 h-3"></span>
                            </div>
                        </div>
                        <div className="flex justify-center text-start flex-col">
                            {/* Name */}
                            <Typography
                                fontFamily={'inherit'}
                                fontSize={'1'}
                                lineHeight={1.2}
                                className="dark:text-white"
                            >
                                Trí Hải
                            </Typography>
                            {/* Last online */}
                            <div className="inline-flex flex-nowrap w-full">
                                <Typography
                                    fontSize={'0.85rem'}
                                    fontFamily={'inherit'}
                                    lineHeight={1.2}
                                    className={'text-[#999]'}
                                >
                                    Hoạt động 2 giờ trước
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
                    <div className="h-[1000px]">
                        <MessageGroup messageList={MessageFakeHistory.first} />
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
        </div>
    );
};

export default MessengerLayout;
