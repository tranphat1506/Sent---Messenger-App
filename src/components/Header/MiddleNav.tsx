import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export type MiddleNavProps = {
    name?: string;
    redirectUrl?: string;
    icon?: JSX.Element;
    solidIcon?: JSX.Element;
};

const MiddleNav: React.FC<MiddleNavProps> = ({
    redirectUrl = '/',
    name,
    icon,
    solidIcon,
}) => {
    const path = window.location.pathname;
    const isCurrentPage = path === redirectUrl;
    return (
        <>
            <Tooltip
                title={name}
                slotProps={{
                    tooltip: {
                        className: '!font-NunitoRegular !text-sm !bg-[#333]',
                    },
                }}
            >
                <Link
                    to={redirectUrl}
                    className={clsx(
                        'h-full inline-flex items-center justify-center',
                        {
                            'border-b-[3px] border-sky-500': isCurrentPage,
                        },
                    )}
                    tabIndex={-1}
                >
                    <button
                        className={clsx(
                            'inline-flex items-center justify-center rounded-md text-3xl p-2 w-[100px]',
                            {
                                'text-[#444] hover:bg-[#00000020] dark:text-[#888888] dark:hover:bg-[#444444]':
                                    !isCurrentPage,
                                'text-sky-500': isCurrentPage,
                            },
                        )}
                        tabIndex={isCurrentPage ? -1 : 0}
                    >
                        {isCurrentPage ? solidIcon : icon}
                    </button>
                </Link>
            </Tooltip>
        </>
    );
};

export default MiddleNav;
