import IconButton from '@/src/components/Buttons/IconButton';
import MessengerLayout from '@/src/components/Layouts/MessengerLayout';
import {
    BiDotsHorizontalRounded,
    BiSolidMessageSquareAdd,
} from 'react-icons/bi';

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
            <div className="font-NunitoMedium">
                <span className="block mx-2 bg-[#444] rounded-3xl">
                    <input
                        className="py-2 bg-transparent outline-none dark:text-[#fff]"
                        id="messenger-search"
                        type="text"
                    />
                </span>
            </div>
        </>
    );
};

export default MessengerPage;
