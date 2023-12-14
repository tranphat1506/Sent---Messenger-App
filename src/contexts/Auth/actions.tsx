import { LOGIN_USER, LOGOUT_USER } from './constants';
import { defaultUserState } from './reducer';
import { LoginUserPayload, LogoutUserPayload, UserDetail } from './types';

export const loginUser = (
    status: boolean,
    userInfo: UserDetail,
): LoginUserPayload => {
    return {
        type: LOGIN_USER,
        payload: {
            isLogging: status,
            detail: userInfo,
        },
    };
};

export const logoutUser = (): LogoutUserPayload => {
    return {
        type: LOGOUT_USER,
        payload: defaultUserState,
    };
};
