import { AuthActionTypes } from './constants';

export type AuthActionType = {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.FORGOT_PASSWORD
        | AuthActionTypes.FORGOT_PASSWORD_CHANGE
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET
        | AuthActionTypes.SIGNUP_USER;
    payload: {} | string;
};

type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

// common success
export const authApiResponseSuccess = (actionType: string, data: User | {}): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthActionType => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const loginUser = (username: string, password: string): AuthActionType => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { username, password },
});

export const logoutUser = (): AuthActionType => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUser = (firstname: string, lastname: string, companyName: string, email: string, password: string, baseCurrency: string): AuthActionType => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { firstname, lastname, companyName, email, password, baseCurrency },
});

export const forgotPassword = (username: string): AuthActionType => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { username },
});

export const resetAuth = (): AuthActionType => ({
    type: AuthActionTypes.RESET,
    payload: {},
});
