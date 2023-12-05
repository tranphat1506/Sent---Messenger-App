import { Time2MessageTitleTime } from '@/src/utils/FormatTime';

type MessageTimeProps = {
    time: string | number;
};
const MessageTime: React.FC<MessageTimeProps> = ({ time }) => {
    return (
        <>
            {/* Message time */}
            <div className="text-center px-6 py-5 text-[#888] text-[13px] font-NunitoMedium">
                {Time2MessageTitleTime(time)}
            </div>
        </>
    );
};

export default MessageTime;
