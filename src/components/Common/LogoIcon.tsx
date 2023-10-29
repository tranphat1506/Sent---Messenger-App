import { Link } from 'react-router-dom';

const LogoIcon: React.FC<{ size?: string }> = ({ size }) => {
    return (
        <Link
            to={'/'}
            className="h-[60px] inline-block"
            style={{ height: size }}
        >
            <img
                src="/sent-icon-96x96.png"
                alt="Sent Logo 96x96"
                srcSet="/sent-icon-48x48.png 48w, /sent-icon-96x96.png 96w"
                sizes="(max-width: 768px) 48px, 96px"
                style={{ height: 'inherit' }}
            />
        </Link>
    );
};

export default LogoIcon;
