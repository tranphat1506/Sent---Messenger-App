import { SettingContext } from '../contexts/setting';
import { useContext } from 'react';

const useGlobalSetting = () => {
    return useContext(SettingContext);
};
export default useGlobalSetting;
