import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import {
    getPoojaris as getPoojarisApi,
    addPoojari as addPoojariApi,
    getPoojariDetails,
    updatePoojariDetails,
    deletePoojariByIdApi,
} from 'helpers/api/poojaris';
import { poojariApiResponseSuccess, poojariApiResponseError } from './actions';
import { PoojariActionTypes } from './constants';

/**
 * Fetches poojaris from the API
 * @param {*} payload - limit, page, and tenantId (or other params if needed)
 */
function* getPoojaris({ payload: { limit, page } }: any): SagaIterator {
    try {
        const response = yield call(getPoojarisApi, { limit, page });
        const poojaris = response.data;
        console.log('poojaris', poojaris);
        yield put(poojariApiResponseSuccess(PoojariActionTypes.GET_POOJARIS, poojaris));
    } catch (error: any) {
        console.log('Error fetching poojaris:', error);
        yield put(poojariApiResponseError(PoojariActionTypes.GET_POOJARIS, error));
    }
}

function* addPoojari({ payload: poojariDetails }: any): SagaIterator {
    try {
        console.log('poojariDetails', poojariDetails);
        const response = yield call(addPoojariApi, { ...poojariDetails });
        const createdPoojari = response?.data;
        yield put(poojariApiResponseSuccess(PoojariActionTypes.ADD_POOJARI, createdPoojari));
    } catch (error: any) {
        console.log('Error adding poojari:', error);
        yield put(poojariApiResponseError(PoojariActionTypes.ADD_POOJARI, error));
    }
}

function* getPoojariDetailsByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(getPoojariDetails, action.payload);
        const poojariDetails = response.data;
        yield put(poojariApiResponseSuccess(PoojariActionTypes.GET_POOJARI_DETAILS, poojariDetails));
    } catch (error: any) {
        yield put(poojariApiResponseError(PoojariActionTypes.GET_POOJARI_DETAILS, error));
    }
}

function* updatePoojariByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(updatePoojariDetails, action.payload);
        const updatedPoojariDetails = response.data;
        yield put(poojariApiResponseSuccess(PoojariActionTypes.UPDATE_POOJARI, updatedPoojariDetails));
    } catch (error: any) {
        yield put(poojariApiResponseError(PoojariActionTypes.UPDATE_POOJARI, error));
    }
}

function* deletePoojariByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(deletePoojariByIdApi, action.payload);
        const poojariList = response.data;
        yield put(poojariApiResponseSuccess(PoojariActionTypes.DELETE_POOJARI, poojariList));
    } catch (error: any) {
        yield put(poojariApiResponseError(PoojariActionTypes.DELETE_POOJARI, 'Failed to delete Poojari'));
    }
}

export function* watchGetPoojaris() {
    yield takeEvery(PoojariActionTypes.GET_POOJARIS, getPoojaris);
}

export function* watchAddPoojari() {
    yield takeEvery(PoojariActionTypes.ADD_POOJARI, addPoojari);
}

export function* watchUpdatePoojariById() {
    yield takeEvery(PoojariActionTypes.UPDATE_POOJARI, updatePoojariByIdSaga);
}

export function* watchGetPoojariDetailsById() {
    yield takeEvery(PoojariActionTypes.GET_POOJARI_DETAILS, getPoojariDetailsByIdSaga);
}

export function* watchDeletePoojariById() {
    yield takeEvery(PoojariActionTypes.DELETE_POOJARI, deletePoojariByIdSaga);
}

/**
 * Root poojari saga
 */
function* poojariSaga() {
    yield all([
        fork(watchGetPoojaris),
        fork(watchAddPoojari),
        fork(watchGetPoojariDetailsById),
        fork(watchUpdatePoojariById),
        fork(watchDeletePoojariById),
    ]);
}

export default poojariSaga;
