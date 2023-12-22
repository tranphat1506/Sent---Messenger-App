import { LOGIN_USER, LOGOUT_USER } from './constants';
import { defaultUserState } from './reducer';
import { LoginUserPayload, LogoutUserPayload, UserDetail } from './types';

export const loginUser = (
    status: boolean,
    userInfo: UserDetail,
): LoginUserPayload => {
    console.log('Đăng nhập thành công!');
    return {
        type: LOGIN_USER,
        payload: {
            isLogging: status,
            detail: userInfo,
        },
    };
};

export const logoutUser = (): LogoutUserPayload => {
    console.log('Đăng xuất thành công.');
    return {
        type: LOGOUT_USER,
        payload: defaultUserState,
    };
};
