import clsx from 'clsx';
import LogoIcon from '../Common/LogoIcon';

type HeaderProps = {};
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div id="header" className={clsx('shadow-md py-3')}>
            <div className="px-4 lg:px-8 w-full flex items-center flex-nowrap">
                <LogoIcon />
            </div>
        </div>
    );
};

export default Header;
