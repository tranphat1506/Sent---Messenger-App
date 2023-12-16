import LogoIcon from '../Common/LogoIcon';
import Menu from './Menu';
import More from './More';
import Messenger from './Messenger';
import Notification from './Notification';
import UserButton from './User';
import { BiHomeAlt2, BiSolidHomeAlt2 } from 'react-icons/bi';
import { PiUsersBold, PiUsersFill } from 'react-icons/pi';
import { BsMusicPlayer, BsMusicPlayerFill } from 'react-icons/bs';
import MiddleNav, { MiddleNavProps } from './MiddleNav';
import Container from '../Common/Container';
import useAuthStore from '@/src/hooks/useAuthStore';
import LoginHeader from './LoginHeader';
import { useNavigate } from 'react-router-dom';
const MiddleNavApi: MiddleNavProps[] = [
    {
        name: 'Trang chủ',
        redirectUrl: '/',
        icon: <BiHomeAlt2 />,
        solidIcon: <BiSolidHomeAlt2 />,
    },
    {
        name: 'Bạn bè',
        redirectUrl: '/friends',
        icon: <PiUsersBold />,
        solidIcon: <PiUsersFill />,
    },
    {
        name: 'Trung tâm âm nhạc',
        redirectUrl: '/friends',
        icon: <BsMusicPlayer />,
        solidIcon: <BsMusicPlayerFill />,
    },
];
type HeaderProps = {};
const Header: React.FC<HeaderProps> = (props) => {
    const [authStore, dispatchAuthStore] = useAuthStore();
    if (!authStore?.isLogging) return <LoginHeader />;
    return (
        <div
            id="header"
            className="fixed z-50 w-full shadow-sm h-[80px] flex items-center dark:bg-[#222] bg-white border-b-[1px] dark:border-[#555]"
        >
            <Container className="flex flex-nowrap justify-between px-4 lg:px-8 ">
                <div className="z-10 inline-flex items-center">
                    <LogoIcon className="max-[480px]:!hidden" />
                    <More />
                </div>
                <div className="z-10 inline-flex items-center gap-4">
                    <Menu />
                    <Notification notiCount={10} />
                    <Messenger on={true} />
                    <UserButton />
                </div>
            </Container>
            <Container className="!max-w-none flex-nowrap justify-center items-center gap-4 h-full hidden lg:flex absolute top-0 left-0">
                {MiddleNavApi.map((nav, index) => {
                    return <MiddleNav {...nav} key={index} />;
                })}
            </Container>
        </div>
    );
};

export default Header;
