type MessengerLayoutProps = {
    MessengerTitle: React.ReactNode;
};
const MessengerLayout: React.FC<MessengerLayoutProps> = ({
    MessengerTitle,
}) => {
    return (
        <div className="w-screen h-auto flex justify-between">
            <div className="dark:bg-[#222] min-w-[380px] h-[calc(100vh-80px)] border-r-[1px] dark:border-[#555]">
                {MessengerTitle}
            </div>
            <div className="dark:bg-[#222] w-full h-[calc(100vh-80px)]"></div>
        </div>
    );
};

export default MessengerLayout;
