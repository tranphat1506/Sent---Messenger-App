import { LOGIN_USER, LOGOUT_USER } from './constants';
import { UserPayload, UserState } from './types';

const defaultUserState: UserState = {
    isLogging: false,
    detail: {},
};

const reducer: React.Reducer<UserState, UserPayload> = (
    state: UserState,
    payload: UserPayload,
): UserState => {
    let newState: UserState;
    switch (payload.type) {
        case LOGOUT_USER:
        case LOGIN_USER:
            newState = { ...state, ...payload.payload };
            break;
        default:
            throw new Error('Invalid type!');
    }
    return newState;
};

export { defaultUserState };
export default reducer;
