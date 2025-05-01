import { UserActionTypes } from './constants';

export type UserActionType = {
    type:
        | UserActionTypes.API_RESPONSE_SUCCESS
        | UserActionTypes.API_RESPONSE_ERROR
        | UserActionTypes.GET_USERS
        | UserActionTypes.GET_USER_DETAILS
        | UserActionTypes.ADD_USER
        | UserActionTypes.UPDATE_USER
        | UserActionTypes.DELETE_USER
        | UserActionTypes.GET_DASHBOARD_DATA;
    payload: {} | string;
};
export type User = {
    id?: number;
    email: string;
    firstname: string;
    middlename?: any;
    lastname: string;
    role: string;
    isEmailVerified: boolean;
    phone?: any;
    username: string;
    userTyoe: string;
    isActive: boolean;
};
// common success
export const userApiResponseSuccess = (actionType: string, data: User | {}): UserActionType => ({
    type: UserActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const userApiResponseError = (actionType: string, error: string): UserActionType => ({
    type: UserActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAllUsers = (): UserActionType => ({
    type: UserActionTypes.GET_USERS,
    payload: {},
});

export const getUserByIdAction = (userId: string): UserActionType => ({
    type: UserActionTypes.GET_USER_DETAILS,
    payload: { userId },
});
export const updateUserByIdAction = (userData: any): UserActionType => ({
    type: UserActionTypes.UPDATE_USER,
    payload: {
        userData: userData,
    },
});
export const addUserAction = (userData: any): UserActionType => ({
    type: UserActionTypes.ADD_USER,
    payload: {
        userData: userData,
    },
});
export const deleteUserByIdAction = (userId: number): UserActionType => ({
    type: UserActionTypes.DELETE_USER,
    payload: {
        userId: userId,
    },
});

export const getDashboardDataAction = (startDate: string, endDate: string): UserActionType => ({
    type: UserActionTypes.GET_DASHBOARD_DATA,
    payload: {
        startDate,
        endDate,
    },
});
