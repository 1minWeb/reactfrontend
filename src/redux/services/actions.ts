import { IService } from 'pages/apps/Services/types';
import { ServiceActionTypes } from './constants';

export type ServiceActionType = {
    type:
        | ServiceActionTypes.API_RESPONSE_SUCCESS
        | ServiceActionTypes.API_RESPONSE_ERROR
        | ServiceActionTypes.GET_SERVICES
        | ServiceActionTypes.ADD_SERVICE
        | ServiceActionTypes.DELETE_SERVICE
        | ServiceActionTypes.GET_SERVICE_DETAILS
        | ServiceActionTypes.UPDATE_SERVICE
        | ServiceActionTypes.RESET;

    payload: {} | string;
};

// common success
export const serviceApiResponseSuccess = (actionType: string, data: IService[] | {}): ServiceActionType => ({
    type: ServiceActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const serviceApiResponseError = (actionType: string, error: string): ServiceActionType => ({
    type: ServiceActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getServices = (params:any): ServiceActionType => ({
    type: ServiceActionTypes.GET_SERVICES,
    payload: params,
});

// Add services
export const addService = (params:any): ServiceActionType => ({
    
    type: ServiceActionTypes.ADD_SERVICE,
    payload: params,

});

export const getServiceByIdAction = (serviceId: string): ServiceActionType => ({
    type: ServiceActionTypes.GET_SERVICE_DETAILS,
    payload: { serviceId }
})
export const updateServiceByIdAction = (serviceData: any): ServiceActionType => ({
   
    type: ServiceActionTypes.UPDATE_SERVICE,
    payload:serviceData
});

export const deleteServiceByIdAction = (serviceId: number): ServiceActionType => ({
    
    type: ServiceActionTypes.DELETE_SERVICE,
    payload: {
        serviceId
    }
});