import { IEvent } from 'pages/apps/Events/types';
import { EventsActionTypes } from './constants';

export type EventsActionType = {
    type:
        | EventsActionTypes.API_RESPONSE_SUCCESS
        | EventsActionTypes.API_RESPONSE_ERROR
        | EventsActionTypes.GET_EVENTS
        | EventsActionTypes.ADD_EVENTS // Add new action type
        | EventsActionTypes.RESET
        | EventsActionTypes.GET_EVENT_DETAILS
        | EventsActionTypes.DELETE_EVENT
        | EventsActionTypes.UPDATE_EVENT
    payload: {} | string | IEvent[]; // Adjusted to include IEvent[] for adding events
};

// common success
export const eventApiResponseSuccess = (actionType: string, data: IEvent[] | {}): EventsActionType => ({
    type: EventsActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// common error
export const eventApiResponseError = (actionType: string, error: string): EventsActionType => ({
    type: EventsActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getEvents = (params?: any): EventsActionType => ({
    type: EventsActionTypes.GET_EVENTS,
    payload: params,
});

// Add events
export const addEvent = (params:any): EventsActionType => ({
    
    type: EventsActionTypes.ADD_EVENTS,
    payload: params,

});

export const getEventByIdAction = (eventId: string): EventsActionType => ({
    type: EventsActionTypes.GET_EVENT_DETAILS,
    payload: { eventId }
})
export const updateEventByIdAction = (eventData: any): EventsActionType => ({
    type: EventsActionTypes.UPDATE_EVENT,
    payload:eventData
});

export const deleteEventByIdAction = (eventId: number): EventsActionType => ({
    
    type: EventsActionTypes.DELETE_EVENT,
    payload: {
        eventId
    }
});