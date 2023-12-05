import clsx from 'clsx';
import MessageTime from './MessageTime';
import Message from './Message';
import { Avatar } from '@mui/material';

type MessageGroupProps = {
    className?: string;
    messageList?: any[];
};
const MessageGroup: React.FC<MessageGroupProps> = ({
    className,
    messageList,
}) => {
    if (!messageList) return <></>;
    return (
        <>
            {messageList.map((message, index) => {
                if (message.isMessageTime)
                    return <MessageTime key={index} time={message.time} />;
                return (
                    <div
                        key={index}
                        className={clsx('mx-2 flex items-center mb-[2px]', {
                            'flex-row-reverse': message.isMyMessage,
                        })}
                    >
                        {!message.isMyMessage && (
                            <span className="w-8 h-8">
                                {message.isEndText && (
                                    <Avatar
                                        src={message.avtSrc}
                                        className="!w-8 !h-8"
                                    />
                                )}
                            </span>
                        )}
                        <div
                            className={clsx(
                                'flex gap-[3px] flex-col ml-2 w-full',
                                {
                                    'my-text mr-2 ml-0 items-end my-text':
                                        message.isMyMessage,
                                },
                            )}
                        >
                            <Message {...message} />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default MessageGroup;
