import clsx from 'clsx';
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
    return (
        <div
            id="header"
            className={clsx('relative shadow-md py-2 md:py-1 max-[480px]:py-3')}
        >
            <div className="px-4 lg:px-8 w-full flex flex-nowrap justify-between">
                <div className="z-10 inline-flex items-center">
                    <LogoIcon className="max-[480px]:!hidden" />
                    <More />
                </div>
                <div className="z-10 inline-flex items-center gap-4">
                    <Menu />
                    <Notification />
                    <Messenger />
                    <UserButton />
                </div>
            </div>
            <div className="hidden lg:flex absolute top-0 left-0 mx-auto w-full h-full flex-nowrap justify-center items-center gap-4">
                {MiddleNavApi.map((nav, index) => {
                    return <MiddleNav {...nav} key={index} />;
                })}
            </div>
        </div>
    );
};

export default Header;
