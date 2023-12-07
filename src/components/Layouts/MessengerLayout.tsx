import { MessageCard } from '@/src/pages/Messenger/page';
import { useState } from 'react';
import MessageContainer from '../Message/MessageContainer';

type MessengerLayoutProps = {
    MessengerTitle: React.ReactNode;
};
const MessengerLayout: React.FC<MessengerLayoutProps> = ({
    MessengerTitle,
}) => {
    const [userId, setUserId] = useState<string | undefined>();
    const handleChangeUser = (id: string) => (e: React.MouseEvent) => {
        setUserId(id);
    };
    return (
        <div className="w-screen h-auto flex justify-between">
            <div className="flex flex-col dark:bg-[#222] max-w-[380px] min-w-[380px] h-[calc(100vh-80px)] border-r-[1px] dark:border-[#555]">
                {MessengerTitle}
                <div className="h-full mx-2 my-2 overflow-auto">
                    <div className="mr-2 font-NunitoMedium">
                        <MessageCard
                            onClick={handleChangeUser('1')}
                            username="Trí Hải"
                            message="Hello em! Cho anh làm quen."
                            messageTime="5 phút"
                            disableNotify={true}
                            status={{ iAmSeen: false, seenList: [] }}
                        />
                    </div>
                </div>
            </div>
            <MessageContainer userId={userId} />
        </div>
    );
};

export default MessengerLayout;
