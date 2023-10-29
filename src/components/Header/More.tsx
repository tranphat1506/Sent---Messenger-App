import { HiMenu } from 'react-icons/hi';
import { IconButton, Tooltip } from '@mui/material';
const More = () => {
    return (
        <Tooltip
            title="Thêm"
            slotProps={{
                tooltip: {
                    className: '!font-NunitoRegular !text-sm !bg-[#333]',
                },
            }}
            className="lg:!hidden !block"
        >
            <IconButton className="!rounded-md dark:text-[#888888]">
                <HiMenu />
            </IconButton>
        </Tooltip>
    );
};

export default More;
