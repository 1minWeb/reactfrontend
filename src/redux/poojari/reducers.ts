import { IPoojari, IRitual } from 'pages/apps/Poojari/types';
import { PoojariActionTypes } from './constants';

// Add IRitual type import (adjust the import path as needed)

const INIT_STATE: State = {
    loading: false,
    results: [],
    poojariDetailsById: null,
    rituals: [], // Added rituals to initial state
};

type PoojariActionType = {
    type:
        | PoojariActionTypes.API_RESPONSE_SUCCESS
        | PoojariActionTypes.API_RESPONSE_ERROR
        | PoojariActionTypes.GET_POOJARIS
        | PoojariActionTypes.GET_POOJARI_DETAILS
        | PoojariActionTypes.UPDATE_POOJARI
        | PoojariActionTypes.ADD_POOJARI
        | PoojariActionTypes.DELETE_POOJARI
        | PoojariActionTypes.GET_ALL_RITUALS
        | PoojariActionTypes.RESET;

    payload: {
        actionType?: string;
        data?: IPoojari[] | IRitual[] | IPoojari | IRitual | {} | any;
        error?: string;
    };
};

type State = {
    results: IPoojari[];
    loading?: boolean;
    error?: string;
    poojariDetailsById: IPoojari | null;
    rituals?: IRitual[]; // Added rituals to State type
};

const Poojaris = (state: State = INIT_STATE, action: PoojariActionType) => {
    switch (action.type) {
        case PoojariActionTypes.API_RESPONSE_SUCCESS: {
            const { actionType, data } = action.payload;
            switch (actionType) {
                case PoojariActionTypes.GET_POOJARIS: {
                    return {
                        ...state,
                        loading: false,
                        poojaris: action.payload.data.poojaris,
                        results: action.payload.data,
                    };
                }
                case PoojariActionTypes.GET_POOJARI_DETAILS:
                    return {
                        ...state,
                        poojariDetailsById: (data as IPoojari) || null,
                        loading: false,
                    };

                case PoojariActionTypes.UPDATE_POOJARI:
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : state.results,
                        loading: false,
                    };

                case PoojariActionTypes.ADD_POOJARI:
                    return {
                        ...state,
                        poojariDetailsById: (data as IPoojari) || null,
                        loading: false,
                    };
                case PoojariActionTypes.DELETE_POOJARI: {
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : state.results,
                        loading: false,
                    };
                }
                case PoojariActionTypes.GET_ALL_RITUALS: {
                    return {
                        ...state,
                        rituals: action.payload.data,
                        loading: false,
                    };
                }

                default:
                    return { ...state };
            }
        }
        case PoojariActionTypes.API_RESPONSE_ERROR: {
            const { actionType, error } = action.payload;
            switch (actionType) {
                case PoojariActionTypes.GET_POOJARIS: {
                    return {
                        ...state,
                        error: error,
                    };
                }
                case PoojariActionTypes.GET_POOJARI_DETAILS: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case PoojariActionTypes.UPDATE_POOJARI: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case PoojariActionTypes.ADD_POOJARI: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case PoojariActionTypes.DELETE_POOJARI: {
                    return {
                        ...state,
                        error: error,
                        loading: false,
                    };
                }
                case PoojariActionTypes.GET_ALL_RITUALS: {
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
        case PoojariActionTypes.GET_POOJARIS:
            return { ...state, loading: true };
        case PoojariActionTypes.GET_POOJARI_DETAILS:
            return { ...state, loading: true };
        case PoojariActionTypes.UPDATE_POOJARI:
            return { ...state, loading: true };
        case PoojariActionTypes.DELETE_POOJARI:
            return { ...state, loading: true };
        case PoojariActionTypes.GET_ALL_RITUALS:
            return { ...state, loading: true };
        case PoojariActionTypes.RESET:
            return {
                ...state,
            };
        default:
            return { ...state };
    }
};

export default Poojaris;
