import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import {
    getEvents as getEventsApi,
    addEvent as addEventApi,
    getEventDetails,
    updateEventDetails,
    deleteEventByIdApi,
} from 'helpers/api/events';
import { EventsActionTypes } from './constants';
import { eventApiResponseSuccess, eventApiResponseError } from './actions';

/**
 * Fetches events from the API
 * @param {*} payload - limit, page, and tenantId (or other params if needed)
 */
function* getEvents({ payload: { limit, page } }: any): SagaIterator {
    try {
        const response = yield call(getEventsApi, { limit, page });
        const events = response.data?.results;
        yield put(eventApiResponseSuccess(EventsActionTypes.GET_EVENTS, events));
    } catch (error: any) {
        yield put(eventApiResponseError(EventsActionTypes.GET_EVENTS, error));
    }
}

function* addEvent({ payload: eventDetails }: any): SagaIterator {
    try {
        const response = yield call(addEventApi, { ...eventDetails });
        const createdEvent = response?.data;
        yield put(eventApiResponseSuccess(EventsActionTypes.ADD_EVENTS, createdEvent));
    } catch (error: any) {
        console.log('coming here err', error);
        yield put(eventApiResponseError(EventsActionTypes.ADD_EVENTS, error));
    }
}

function* getEventDetailsByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(getEventDetails, action.payload);
        const eventDetails = response.data;
        console.log(eventDetails);
        yield put(eventApiResponseSuccess(EventsActionTypes.GET_EVENT_DETAILS, eventDetails));
    } catch (error: any) {
        yield put(eventApiResponseError(EventsActionTypes.GET_EVENT_DETAILS, error));
    }
}
function* updateEventByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(updateEventDetails, action.payload); // Replace with your API function and payload
        const updatedEventDetails = response.data;
        yield put(eventApiResponseSuccess(EventsActionTypes.UPDATE_EVENT, updatedEventDetails));
    } catch (error: any) {
        yield put(eventApiResponseError(EventsActionTypes.UPDATE_EVENT, error));
    }
}

function* deleteEventByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(deleteEventByIdApi, action.payload); // Pass userId to the API function
        const eventList = response.data; // Assuming the response contains a single user
        yield put(eventApiResponseSuccess(EventsActionTypes.DELETE_EVENT, eventList));
    } catch (error: any) {
        yield put(eventApiResponseError(EventsActionTypes.DELETE_EVENT, 'Failed to delete User'));
    }
}

/**
 * Watches for GET_EVENTS action
 */
export function* watchGetEvents() {
    yield takeEvery(EventsActionTypes.GET_EVENTS, getEvents);
}

export function* watchAddEvents() {
    yield takeEvery(EventsActionTypes.ADD_EVENTS, addEvent);
}
export function* watchUpdateEventById() {
    yield takeEvery(EventsActionTypes.UPDATE_EVENT, updateEventByIdSaga);
}
export function* watchGetEventDetailsById() {
    yield takeEvery(EventsActionTypes.GET_EVENT_DETAILS, getEventDetailsByIdSaga);
}
export function* watchDeleteEventById() {
    yield takeEvery(EventsActionTypes.DELETE_EVENT, deleteEventByIdSaga);
}
/**
 * Root event saga
 */
function* eventSaga() {
    yield all([
        fork(watchGetEvents),
        fork(watchAddEvents),
        fork(watchGetEventDetailsById),
        fork(watchUpdateEventById),
        fork(watchDeleteEventById),
    ]);
}

export default eventSaga;
