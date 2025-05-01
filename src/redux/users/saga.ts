import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { userApiResponseSuccess, userApiResponseError } from './actions';
import { UserActionTypes } from './constants';
import {
    addUser,
    deleteUserByIdApi,
    getAllUsers as getAllUsersApi,
    getDashboardDataApi,
    getUserDetails,
    updateUserDetails,
} from 'helpers/api/user';

function* getAllUsers(): SagaIterator {
    try {
        const response = yield call(getAllUsersApi);
        const users = response.data;
        yield put(userApiResponseSuccess(UserActionTypes.GET_USERS, users));
    } catch (error: any) {
        yield put(userApiResponseError(UserActionTypes.GET_USERS, error));
    }
}
function* getUserDetailsByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(getUserDetails, action.payload);
        const userDetails = response.data;
        yield put(userApiResponseSuccess(UserActionTypes.GET_USER_DETAILS, userDetails));
    } catch (error: any) {
        yield put(userApiResponseError(UserActionTypes.GET_USER_DETAILS, error));
    }
}
function* updateUserByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(updateUserDetails, action.payload?.userData); // Replace with your API function and payload
        const updatedUserDetails = response.data;
        yield put(userApiResponseSuccess(UserActionTypes.UPDATE_USER, updatedUserDetails));
    } catch (error: any) {
        yield put(userApiResponseError(UserActionTypes.UPDATE_USER, error));
    }
}
function* addUserSaga(action: any): SagaIterator {
    try {
        const response = yield call(addUser, action.payload?.userData); // Replace with your API function and payload
        const updatedUserDetails = response.data;
        yield put(userApiResponseSuccess(UserActionTypes.ADD_USER, updatedUserDetails));
    } catch (error: any) {
        yield put(userApiResponseError(UserActionTypes.ADD_USER, error));
    }
}
function* deleteUserByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(deleteUserByIdApi, action.payload); // Pass userId to the API function
        const userList = response.data; // Assuming the response contains a single user
        yield put(userApiResponseSuccess(UserActionTypes.DELETE_USER, userList));
    } catch (error: any) {
        yield put(userApiResponseError(UserActionTypes.DELETE_USER, 'Failed to delete User'));
    }
}
function* getDashboardDataSaga(action: any): SagaIterator {
    try {
        const response = yield call(getDashboardDataApi, action.payload);
        const dashboardData = response.data;
        yield put(userApiResponseSuccess(UserActionTypes.GET_DASHBOARD_DATA, dashboardData));
    } catch (error: any) {
        yield put(userApiResponseError(UserActionTypes.GET_DASHBOARD_DATA, error));
    }
}
function* watchGetDashBoardData() {
    yield takeEvery(UserActionTypes.GET_DASHBOARD_DATA, getDashboardDataSaga);
}
export function* watchDeleteUserById() {
    yield takeEvery(UserActionTypes.DELETE_USER, deleteUserByIdSaga);
}
export function* watchAddUser() {
    yield takeEvery(UserActionTypes.ADD_USER, addUserSaga);
}
export function* watchUpdateUserById() {
    yield takeEvery(UserActionTypes.UPDATE_USER, updateUserByIdSaga);
}
export function* watchGetAllUsers() {
    yield takeEvery(UserActionTypes.GET_USERS, getAllUsers);
}
export function* watchGetUserDetailsById() {
    yield takeEvery(UserActionTypes.GET_USER_DETAILS, getUserDetailsByIdSaga);
}
function* userSaga() {
    yield all([
        fork(watchGetAllUsers),
        fork(watchGetUserDetailsById),
        fork(watchUpdateUserById),
        fork(watchAddUser),
        fork(watchDeleteUserById),
        fork(watchGetDashBoardData),
    ]);
}
export default userSaga;
