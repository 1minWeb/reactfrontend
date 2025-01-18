import { Product } from 'pages/apps/Ecommerce/types';
import { ServiceActionTypes } from './constants';
import { IService } from 'pages/apps/Services/types';

const INIT_STATE: State = {
    loading: false,
    results: [],
    serviceDetailsById: null,
};

type ProductActionType = {
    type:
        | ServiceActionTypes.API_RESPONSE_SUCCESS
        | ServiceActionTypes.API_RESPONSE_ERROR
        | ServiceActionTypes.GET_SERVICES
        | ServiceActionTypes.GET_SERVICE_DETAILS
        | ServiceActionTypes.UPDATE_SERVICE
        | ServiceActionTypes.ADD_SERVICE
        | ServiceActionTypes.DELETE_SERVICE
        | ServiceActionTypes.RESET;
    payload: {
        actionType?: string;
        data?: Product[] | {};
        error?: string;
    };
};

type State = {
    results: IService[];
    loading?: boolean;
    error?: string;
    serviceDetailsById: IService | null;
};

const Services = (state: State = INIT_STATE, action: ProductActionType) => {
    switch (action.type) {
        case ServiceActionTypes.API_RESPONSE_SUCCESS: {
            const { actionType, data } = action.payload;
            switch (actionType) {
                case ServiceActionTypes.GET_SERVICES: {
                    return {
                        results: action.payload.data, // Updating results
                    };
                }
                case ServiceActionTypes.GET_SERVICE_DETAILS:
                    return {
                        ...state,
                        serviceDetailsById: (data as IService) || null,
                        loading: false,
                    };

                case ServiceActionTypes.UPDATE_SERVICE:
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : state.results, // Update  results list
                        loading: false,
                    };

                case ServiceActionTypes.ADD_SERVICE:
                    return {
                        ...state,
                        serviceDetailsById: (data as IService) || null,
                        loading: false,
                    };
                case ServiceActionTypes.DELETE_SERVICE: {
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : state.results,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        }
        case ServiceActionTypes.API_RESPONSE_ERROR: {
            const { actionType, error } = action.payload;
            switch (action.payload.actionType) {
                case ServiceActionTypes.GET_SERVICES: {
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                }
                case ServiceActionTypes.GET_SERVICE_DETAILS: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case ServiceActionTypes.UPDATE_SERVICE: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case ServiceActionTypes.ADD_SERVICE: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case ServiceActionTypes.DELETE_SERVICE: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        }
        case ServiceActionTypes.GET_SERVICES:
            return { ...state, loading: true, userLoggedIn: false };
        case ServiceActionTypes.GET_SERVICE_DETAILS:
            return { ...state, loading: true };
        case ServiceActionTypes.UPDATE_SERVICE:
            return { ...state, loading: true };
        case ServiceActionTypes.DELETE_SERVICE:
            return { ...state, loading: true };
        case ServiceActionTypes.RESET:
            return {
                ...state,
            };
        default:
            return { ...state };
    }
};

export default Services;
