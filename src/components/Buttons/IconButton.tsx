import { Tooltip } from '@mui/material';
import clsx from 'clsx';

type IconButtonProps = {
    title: string;
    icon: React.ReactNode;
    className?: string;
    tooltipClassName?: string;
    onClick?: React.MouseEventHandler;
};
const IconButton: React.FC<IconButtonProps> = ({
    title,
    icon,
    className,
    tooltipClassName,
    onClick,
}) => {
    return (
        <Tooltip
            title={title}
            slotProps={{
                tooltip: {
                    className: clsx(
                        '!font-NunitoRegular !text-sm !bg-[#333]',
                        tooltipClassName,
                    ),
                },
            }}
        >
            <button
                className={clsx(
                    'rounded-full dark:text-[#888888] dark:hover:bg-[#444444] dark:bg-[#1E1E1E] bg-[#00000008] hover:bg-[#00000020] active:scale-95 text-2xl text-[#444] p-2',
                    className,
                )}
                onClick={onClick}
            >
                {icon}
            </button>
        </Tooltip>
    );
};

export default IconButton;
