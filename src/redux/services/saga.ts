import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import {
    getServices as getServicesApi,
    addService as addServiceApi,
    getServiceDetails,
    updateServiceDetails,
    deleteServiceByIdApi,
} from 'helpers/api/services';
import { serviceApiResponseSuccess, serviceApiResponseError } from './actions';
import { ServiceActionTypes } from './constants';

/**
 * Fetches services from the API
 * @param {*} payload - limit, page, and tenantId (or other params if needed)
 */
function* getServices({ payload: { limit, page, tenantId } }: any): SagaIterator {
    try {
        const response = yield call(getServicesApi, { limit, page, tenantId });
        const services = response.data?.results;
        yield put(serviceApiResponseSuccess(ServiceActionTypes.GET_SERVICES, services));
    } catch (error: any) {
        console.log('Error fetching services:', error);
        yield put(serviceApiResponseError(ServiceActionTypes.GET_SERVICES, error));
    }
}

function* addService({ payload: serviceDetails }: any): SagaIterator {
    try {
        console.log('serviceDetails', serviceDetails);
        const response = yield call(addServiceApi, { ...serviceDetails });
        const createdService = response?.data;
        yield put(serviceApiResponseSuccess(ServiceActionTypes.ADD_SERVICE, createdService));
    } catch (error: any) {
        console.log('coming here err', error);
        yield put(serviceApiResponseError(ServiceActionTypes.ADD_SERVICE, error));
    }
}

function* getServiceDetailsByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(getServiceDetails, action.payload);
        const serviceDetails = response.data;
        console.log(serviceDetails);
        yield put(serviceApiResponseSuccess(ServiceActionTypes.GET_SERVICE_DETAILS, serviceDetails));
    } catch (error: any) {
        yield put(serviceApiResponseError(ServiceActionTypes.GET_SERVICE_DETAILS, error));
    }
}

function* updateServiceByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(updateServiceDetails, action.payload); // Replace with your API function and payload
        const updatedServiceDetails = response.data;
        yield put(serviceApiResponseSuccess(ServiceActionTypes.UPDATE_SERVICE, updatedServiceDetails));
    } catch (error: any) {
        yield put(serviceApiResponseError(ServiceActionTypes.UPDATE_SERVICE, error));
    }
}

function* deleteServiceByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(deleteServiceByIdApi, action.payload); // Pass userId to the API function
        const serviceList = response.data; // Assuming the response contains a single user
        yield put(serviceApiResponseSuccess(ServiceActionTypes.DELETE_SERVICE, serviceList));
    } catch (error: any) {
        yield put(serviceApiResponseError(ServiceActionTypes.DELETE_SERVICE, 'Failed to delete User'));
    }
}

/**
 * Watches for GET_SERVICES action
 */
export function* watchGetServices() {
    yield takeEvery(ServiceActionTypes.GET_SERVICES, getServices);
}

export function* watchAddServices() {
    yield takeEvery(ServiceActionTypes.ADD_SERVICE, addService);
}
export function* watchUpdateServiceById() {
    yield takeEvery(ServiceActionTypes.UPDATE_SERVICE, updateServiceByIdSaga);
}
export function* watchGetServiceDetailsById() {
    yield takeEvery(ServiceActionTypes.GET_SERVICE_DETAILS, getServiceDetailsByIdSaga);
}
export function* watchDeleteServiceById() {
    yield takeEvery(ServiceActionTypes.DELETE_SERVICE, deleteServiceByIdSaga);
}

/**
 * Root service saga
 */
function* serviceSaga() {
    yield all([
        fork(watchGetServices),
        fork(watchAddServices),
        fork(watchGetServiceDetailsById),
        fork(watchUpdateServiceById),
        fork(watchDeleteServiceById),
    ]);
}

export default serviceSaga;
