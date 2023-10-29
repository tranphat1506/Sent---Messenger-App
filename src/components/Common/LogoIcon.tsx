import clsx from 'clsx';
import { Link } from 'react-router-dom';

const LogoIcon: React.FC<{ size?: string; className?: string }> = ({
    size,
    className,
}) => {
    return (
        <Link
            to={'/'}
            className={clsx(
                'md:h-[60px] h-[48px] inline-flex items-end rounded',
                className,
            )}
            style={{ height: size }}
        >
            <img
                src="/sent-icon-96x96.png"
                alt="Sent Logo"
                srcSet="/sent-icon-48x48.png 48w, /sent-icon-96x96.png 96w"
                sizes="(max-width: 768px) 48px, 96px"
                style={{ height: 'inherit' }}
            />
            <h1
                className="font-NunitoBlack text-md md:text-xl leading-none text-skyBlue relative -left-3 md:bottom-0 bottom-1"
                style={{ letterSpacing: '2px' }}
            >
                SENT
            </h1>
        </Link>
    );
};

export default LogoIcon;
