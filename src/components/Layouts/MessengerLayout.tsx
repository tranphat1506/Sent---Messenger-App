import { MessageCard } from '@/src/pages/Messenger/page';
import { useState, useEffect, Fragment } from 'react';
import MessageContainer from '../Message/MessageContainer';
import { room_list } from '../Message/MessageFakeHistory.json';

type MessengerLayoutProps = {
    MessengerTitle: React.ReactNode;
};
const MessengerLayout: React.FC<MessengerLayoutProps> = ({
    MessengerTitle,
}) => {
    const [roomList, setRoomList] = useState<any>(null);
    useEffect(() => {
        let id = setTimeout(() => {
            setRoomList(room_list);
            clearTimeout(id);
        }, 2000);
        return () => {
            clearTimeout(id);
        };
    }, []);
    const [roomDetail, setRoomDetail] = useState<any>(null);
    const handleChangeRoom = (id: string) => () => {
        if (id === roomDetail?.room_id) return false;
        setRoomDetail({ ...room_list[id as keyof typeof room_list] });
    };
    return (
        <div className="w-screen h-auto flex justify-between">
            <div className="flex flex-col dark:bg-[#222] max-w-[380px] min-w-[380px] h-[calc(100vh-80px)] border-r-[1px] dark:border-[#555]">
                {MessengerTitle}
                <div className="h-full mx-2 my-2 overflow-auto">
                    <div className="mr-2 font-NunitoMedium">
                        {roomList &&
                            Object.keys(roomList).map((roomId) => {
                                const room = roomList[roomId];
                                if (!room)
                                    return <Fragment key={roomId}></Fragment>;
                                return (
                                    <MessageCard
                                        key={roomId}
                                        roomAvt={room.avt_src}
                                        onClick={handleChangeRoom(roomId)}
                                        displayName={room.display_name}
                                        message_details={room.message_details}
                                        disableNotify={true}
                                        status={{
                                            iAmSeen: false,
                                            seenList: [],
                                        }}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            <MessageContainer roomDetail={roomDetail} />
        </div>
    );
};

export default MessengerLayout;
