import IconButton from '@/src/components/Buttons/IconButton';
import MessengerLayout from '@/src/components/Layouts/MessengerLayout';
import { useState } from 'react';

import {
    BiDotsHorizontalRounded,
    BiSolidMessageSquareAdd,
} from 'react-icons/bi';
import { LuDot, LuSearch } from 'react-icons/lu';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Avatar, Typography } from '@mui/material';
import { BsBellSlashFill } from 'react-icons/bs';
import clsx from 'clsx';
type MessengerPageProps = {};
const MessengerPage: React.FC<MessengerPageProps> = () => {
    return (
        <div className="max-h-screen h-auto pt-[80px] dark:bg-[#2c2c2c]">
            <MessengerLayout
                MessengerTitle={<MessengerTitle title="Tin nhắn" />}
            />
        </div>
    );
};

type MessengerTitleProps = {
    title: string;
};
const MessengerTitle: React.FC<MessengerTitleProps> = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const handelSearchMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };
    return (
        <>
            <div className="flex py-3 px-4 justify-between">
                <h1 className="font-NunitoBlack text-3xl dark:text-[#eee]">
                    {props.title}
                </h1>
                <span className="inline-flex gap-2">
                    <IconButton
                        title="Cài đặt"
                        icon={<BiDotsHorizontalRounded />}
                    />
                    <IconButton
                        title="Thêm tin nhắn"
                        icon={<BiSolidMessageSquareAdd />}
                    />
                </span>
            </div>
            <div className="flex font-NunitoMedium mx-4 my-2 gap-2">
                {searchValue && (
                    <IconButton title="Quay lại" icon={<IoArrowBackSharp />} />
                )}
                <label
                    htmlFor="messenger-search"
                    className="flex w-full dark:bg-[#444] bg-[#0000001e] rounded-3xl items-center"
                >
                    <button className="text-2xl dark:text-[#eee] p-2 rounded-l-3xl">
                        <LuSearch />
                    </button>
                    <input
                        onChange={handelSearchMessage}
                        placeholder="Tìm kiếm tin nhắn ..."
                        className="rounded-r-3xl p-2 w-full bg-transparent dark:text-[#fff] placeholder:text-[#444] dark:placeholder:text-[#888]"
                        id="messenger-search"
                        type="text"
                    />
                </label>
            </div>
        </>
    );
};

type MessageCardProps = {
    username?: string;
    message?: string;
    messageTime?: string;
    disableNotify: boolean;
    status: {
        seenList: string[];
        iAmSeen: boolean;
    };
};
export const MessageCard: React.FC<MessageCardProps> = (props) => {
    return (
        <div className="left-message relative cursor-pointer flex gap-3 items-center p-3 rounded-xl dark:hover:bg-[#ffffff09] hover:bg-[#00000009]">
            <Avatar className="!w-12 !h-12" />
            <div className="flex w-full flex-col">
                {/* Name */}
                <Typography
                    fontFamily={'inherit'}
                    fontSize={'1'}
                    lineHeight={1.25}
                    className="dark:text-white"
                >
                    {props.username || 'Tên người dùng'}
                </Typography>
                {/* The latest message and time */}
                <div className="inline-flex flex-nowrap w-full">
                    <Typography
                        fontSize={'0.9rem'}
                        fontFamily={'inherit'}
                        lineHeight={1.25}
                        className={clsx('text-[#999] line-clamp-1', {
                            'dark:!text-[#eee] !text-black':
                                !props.status.iAmSeen,
                        })}
                    >
                        {props.message || ''}
                    </Typography>
                    <LuDot className="text-[#999]" />
                    <Typography
                        component={'span'}
                        fontSize={'0.9rem'}
                        fontFamily={'inherit'}
                        lineHeight={1.25}
                        className="!text-[#999]"
                        whiteSpace={'nowrap'}
                    >
                        {props.messageTime}
                    </Typography>
                </div>
            </div>
            <div className="setting-message absolute right-16 shadow-lg rounded-full invisible">
                <IconButton
                    title="Cài đặt tin nhắn"
                    icon={<BiDotsHorizontalRounded />}
                    className="hover:bg-[#0000009a] text-white bg-[#000000a7]"
                />
            </div>
            <div className="status-message flex gap-1 items-center">
                {/* Not seen yet */}
                {!props.status.iAmSeen && (
                    <span className="bg-sky-400 w-3 h-3 rounded-full"></span>
                )}
                {/* They already seen the message */}
                {props.status.seenList.map((avt, index) => {
                    return (
                        <Avatar
                            key={index}
                            src={avt}
                            alt=""
                            className="!w-4 !h-4"
                        />
                    );
                })}
                {/* Disable notify */}
                {props.disableNotify && (
                    <BsBellSlashFill className="text-xl text-[#888]" />
                )}
            </div>
        </div>
    );
};

export default MessengerPage;
