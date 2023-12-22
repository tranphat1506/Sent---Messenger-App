export type UserState = {
    isLogging: boolean;
    detail: UserDetail;
};
export type UserDetail = any;
export type UserPayload = LoginUserPayload | LogoutUserPayload;
export type UserConstant = string;
export type LoginUserPayload = {
    type: UserConstant;
    payload: UserState;
};
export type LogoutUserPayload = {
    type: UserConstant;
    payload: UserState;
};
