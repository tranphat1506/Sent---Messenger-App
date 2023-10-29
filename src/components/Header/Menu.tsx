import { BiCategory } from 'react-icons/bi';
import { Tooltip } from '@mui/material';

const Menu = () => {
    return (
        <Tooltip
            title="Menu"
            slotProps={{
                tooltip: {
                    className: '!font-NunitoRegular !text-sm !bg-[#333]',
                },
            }}
        >
            <button className="rounded-full bg-[#00000008] hover:bg-[#00000020] active:scale-95 text-2xl text-[#444] p-2">
                <BiCategory />
            </button>
        </Tooltip>
    );
};

export default Menu;
