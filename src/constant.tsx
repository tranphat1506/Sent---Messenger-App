export const BE_URL = 'http://localhost';
export const BE_PORT = 300;
export const API_ENDPOINT = {
    user_login: '/api/auth/signin',
    user_signup: '/api/auth/signup',
    verify_email: '/api/auth/verify?method=email',
    check_logging: '/api/auth/isLogin',
    refresh_token: '/api/auth/refresh-token',
    get_my_info: '/api/user/me',
};
