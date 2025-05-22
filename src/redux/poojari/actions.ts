import { IPoojari } from 'pages/apps/Poojari/types'; // Adjust import path as needed
import { PoojariActionTypes } from './constants';

export type PoojariActionType = {
    type:
        | PoojariActionTypes.API_RESPONSE_SUCCESS
        | PoojariActionTypes.API_RESPONSE_ERROR
        | PoojariActionTypes.GET_POOJARIS
        | PoojariActionTypes.ADD_POOJARI
        | PoojariActionTypes.DELETE_POOJARI
        | PoojariActionTypes.GET_POOJARI_DETAILS
        | PoojariActionTypes.UPDATE_POOJARI
        | PoojariActionTypes.GET_ALL_RITUALS
        | PoojariActionTypes.RESET;

    payload: {} | string;
};

// common success
export const poojariApiResponseSuccess = (actionType: string, data: IPoojari[] | {}): PoojariActionType => ({
    type: PoojariActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// common error
export const poojariApiResponseError = (actionType: string, error: string): PoojariActionType => ({
    type: PoojariActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPoojaris = (params: any): PoojariActionType => ({
    type: PoojariActionTypes.GET_POOJARIS,
    payload: params,
});

// Add poojari
export const addPoojari = (params: any): PoojariActionType => ({
    type: PoojariActionTypes.ADD_POOJARI,
    payload: params,
});

export const getPoojariByIdAction = (poojariId: string): PoojariActionType => ({
    type: PoojariActionTypes.GET_POOJARI_DETAILS,
    payload: { poojariId },
});

export const updatePoojariByIdAction = (poojariData: any): PoojariActionType => ({
    type: PoojariActionTypes.UPDATE_POOJARI,
    payload: poojariData,
});

export const deletePoojariByIdAction = (poojariId: number): PoojariActionType => ({
    type: PoojariActionTypes.DELETE_POOJARI,
    payload: {
        poojariId,
    },
});
export const getAllRitualsAction = (params: any): PoojariActionType => ({
    type: PoojariActionTypes.GET_ALL_RITUALS,
    payload: params,
});
