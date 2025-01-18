import { IEvent } from 'pages/apps/Events/types';
import { EventsActionTypes } from './constants';

const INIT_STATE: State = {
    loading: false,
    results: [],
    eventDetailsById: null,
};

type EventActionType = {
    type:
        | EventsActionTypes.API_RESPONSE_SUCCESS
        | EventsActionTypes.API_RESPONSE_ERROR
        | EventsActionTypes.GET_EVENTS
        | EventsActionTypes.RESET
        | EventsActionTypes.GET_EVENT_DETAILS
        | EventsActionTypes.UPDATE_EVENT
        | EventsActionTypes.ADD_EVENTS
        | EventsActionTypes.DELETE_EVENT;
    payload: {
        actionType?: string;
        data?: IEvent[] | IEvent | [];
        error?: string;
    };
};

type State = {
    results: IEvent[];
    loading?: boolean;
    error?: string;
    eventDetailsById: IEvent | null;
};

const Events = (state: State = INIT_STATE, action: EventActionType): State => {
    switch (action.type) {
        case EventsActionTypes.API_RESPONSE_SUCCESS: {
            const { actionType, data } = action.payload;

            switch (actionType) {
                case EventsActionTypes.GET_EVENTS:
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : [],
                        loading: false,
                    };

                case EventsActionTypes.GET_EVENT_DETAILS:
                    return {
                        ...state,
                        eventDetailsById: (data as IEvent) || null,
                        loading: false,
                    };

                case EventsActionTypes.UPDATE_EVENT:
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : state.results, // Update  results list
                        loading: false,
                    };

                case EventsActionTypes.ADD_EVENTS:
                    return {
                        ...state,
                        eventDetailsById: (data as IEvent) || null,
                        loading: false,
                    };
                case EventsActionTypes.DELETE_EVENT: {
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : state.results,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }

        case EventsActionTypes.API_RESPONSE_ERROR: {
            const { actionType, error } = action.payload;

            switch (actionType) {
                case EventsActionTypes.GET_EVENTS:
                    return {
                        ...state,
                        loading: false,
                        error: error || 'Failed to fetch  results.',
                    };
                case EventsActionTypes.GET_EVENT_DETAILS: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case EventsActionTypes.UPDATE_EVENT: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case EventsActionTypes.ADD_EVENTS: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case EventsActionTypes.DELETE_EVENT: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }

        case EventsActionTypes.GET_EVENTS:
      
            return {
                ...state,
                loading: true,
            };

        case EventsActionTypes.RESET:
            return {
                ...INIT_STATE,
            };
        case EventsActionTypes.GET_EVENT_DETAILS:
            return { ...state, loading: true };
        case EventsActionTypes.UPDATE_EVENT:
            return { ...state, loading: true };
        case EventsActionTypes.DELETE_EVENT:
            return { ...state, loading: true };
        default:
            return state;
    }
};

export default Events;
