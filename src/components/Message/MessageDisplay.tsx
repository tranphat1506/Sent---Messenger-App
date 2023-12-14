import clsx from 'clsx';
import MessageTime from './MessageTime';
import Message from './Message';
import { Avatar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import _ from 'underscore';

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const cvtSeenState2SeenInfo = (
    state: any,
    removeMySeenState?: boolean,
    myId?: string,
) => {
    if (_.isEmpty(state) || state === undefined) {
        return { status: 'sent1', seenList: [] };
    }
    let isAnyRecive = false;
    const seenList: any[] = [];
    Object.keys(state).forEach((memberId) => {
        if (removeMySeenState && memberId === myId) return;
        if (state[memberId].is_recive) isAnyRecive = true;
        if (state[memberId].is_seen || memberId === myId)
            return seenList.push(state[memberId]);
    });
    let status;
    if (!_.isEmpty(seenList) && seenList.length > 0) {
        status = 'seen';
    } else if (isAnyRecive) {
        status = 'sent2';
    } else {
        status = 'sent1';
    }

    return { seenList, status };
};

const cvtByMember2ByMessageId = (state: SeenStateType) => {
    if (state && state.byMemberId) {
        Object.keys(state.byMemberId).forEach((memberId) => {
            const messageId = state.byMemberId[memberId].message_id;
            if (messageId) {
                state.byMessageId = {
                    ...state.byMessageId,
                    [messageId]: {
                        ...state.byMessageId?.[messageId],
                        [memberId]: {
                            ...state.byMemberId[memberId],
                            member_id: memberId,
                        },
                    },
                };
            }
        });
    }
    return state;
};
type SeenStateType = {
    byMemberId: any;
    byMessageId?: {
        [messageId: string | number]: { [memberId: string | number]: any };
    };
};
type MessageDisplayProps = {
    className?: string;
    roomDetail: any;
};
const MessageDisplay: React.FC<MessageDisplayProps> = ({ roomDetail }) => {
    const [messagesHistory, setMessagesHistory] = useState<{
        message_count: number;
        history: {
            [messageId: string | number]: any;
        };
    }>();
    useEffect(() => {
        let id = setTimeout(() => {
            setMessagesHistory(roomDetail.message_details);
            clearTimeout(id);
        }, 500);

        return () => {
            clearTimeout(id);
        };
    }, []);
    const [seenState, setSeenState] = useState<SeenStateType>({
        byMemberId: roomDetail.seen_info,
        byMessageId: undefined,
    });

    useEffect(() => {
        setSeenState(cvtByMember2ByMessageId(seenState));
    }, []);

    const handleUpdateSeenState = (
        memberId: string | number,
        seenInfo: any,
    ) => {
        setSeenState((prevState) => {
            return cvtByMember2ByMessageId({
                byMemberId: { ...prevState.byMemberId, [memberId]: seenInfo },
            });
        });
    };
    useEffect(() => {
        console.log('rerender');
        console.log(seenState);
    }, [seenState]);
    if (!roomDetail) return <></>;
    const MessageEndRef = useRef<HTMLDivElement>(null);
    const lastMessageMemberId = useRef<string | undefined>(undefined);
    useEffect(() => {
        MessageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesHistory]);
    return (
        <>
            {messagesHistory &&
                Object.keys(messagesHistory.history).map((messageId) => {
                    const message = messagesHistory.history[messageId];
                    const isMyMessage = message.send_by === roomDetail.user_id;
                    let lastTemp = lastMessageMemberId.current;
                    let isNextMessageFromAnotherMember =
                        lastTemp !== message.send_by &&
                        message.send_by !==
                            messagesHistory.history[Number(messageId) + 1]
                                ?.send_by
                            ? true
                            : lastTemp === message.send_by &&
                              message.send_by !==
                                  messagesHistory.history[Number(messageId) + 1]
                                      ?.send_by
                            ? true
                            : false;
                    lastMessageMemberId.current = message.send_by;
                    if (message.isMessageTime) {
                        lastMessageMemberId.current = undefined;
                        return (
                            <MessageTime key={messageId} time={message.time} />
                        );
                    }
                    return (
                        <div
                            onClick={() => {
                                const rdId = randomIntFromInterval(1, 3);
                                const rdMId = randomIntFromInterval(
                                    1,
                                    messagesHistory.message_count,
                                );
                                handleUpdateSeenState(rdId, {
                                    message_id: rdMId,
                                    is_recive: true,
                                    is_seen: true,
                                    time: Date.now(),
                                });
                            }}
                            key={messageId}
                            className={clsx('mx-2 flex items-center', {
                                'flex-row-reverse': isMyMessage,
                                'mb-4': isNextMessageFromAnotherMember,
                                'mb-[2px]': !isNextMessageFromAnotherMember,
                            })}
                        >
                            {!isMyMessage && (
                                <span className="w-8 h-8">
                                    {isNextMessageFromAnotherMember && (
                                        // <Avatar
                                        //     src={
                                        //         roomDetail.members[message.send_by]
                                        //             .avt_src
                                        //     }
                                        //     className="!w-8 !h-8"
                                        // />
                                        <div className="relative">
                                            <Avatar
                                                className="!w-8 !h-8"
                                                src={
                                                    roomDetail.members[
                                                        message.send_by
                                                    ].avt_src
                                                }
                                            />
                                            {roomDetail.members[message.send_by]
                                                .is_online && (
                                                <div className="absolute bg-[#fff] dark:bg-[#222] w-[12px] h-[12px] bottom-0 right-0 rounded-full flex justify-center items-center">
                                                    <span className="bg-[#3e3e] rounded-full w-2 h-2"></span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </span>
                            )}
                            <div
                                className={clsx('flex flex-col ml-2 w-full', {
                                    'my-text mr-2 ml-0 items-end my-text':
                                        isMyMessage,
                                })}
                            >
                                <Message
                                    {...message}
                                    isMyMessage={isMyMessage}
                                    members={roomDetail.members}
                                    isLastMessage={
                                        Number(messageId) ===
                                        messagesHistory.message_count
                                    }
                                    seenInfo={cvtSeenState2SeenInfo(
                                        seenState.byMessageId?.[
                                            Number(messageId)
                                        ],
                                        true,
                                        roomDetail.user_id,
                                    )}
                                    myId={roomDetail.user_id}
                                />
                            </div>
                            {Number(messageId) ===
                                messagesHistory.message_count && (
                                <span ref={MessageEndRef}></span>
                            )}
                        </div>
                    );
                })}
        </>
    );
};

export default MessageDisplay;
