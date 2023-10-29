import { Tooltip, Badge } from '@mui/material';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
type MessengerProps = {
    on?: boolean;
};
const Messenger: React.FC<MessengerProps> = ({ on = false }) => {
    return (
        <Tooltip
            title="Tin nhắn"
            slotProps={{
                tooltip: {
                    className: '!font-NunitoRegular !text-sm !bg-[#333]',
                },
            }}
        >
            <Badge
                invisible={!on}
                variant="dot"
                slotProps={{
                    badge: {
                        className: '!font-NunitoRegular !bg-sky-400',
                    },
                }}
            >
                <button className="rounded-full bg-[#00000008] hover:bg-[#00000020] active:scale-95 text-2xl text-[#444] p-2">
                    <BiSolidMessageSquareDetail />
                </button>
            </Badge>
        </Tooltip>
    );
};

export default Messenger;
