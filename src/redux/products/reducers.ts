import { Product } from 'pages/apps/Ecommerce/types';
import { ProductActionTypes } from './constants';

const INIT_STATE = {
    results: [],
    createdProduct: {},
    isProductCreated: false,
    loading: false,
    error: null,
    uploadedImage: null,
    productDetailsById: null,
};

type ProductActionType = {
    type:
        | ProductActionTypes.API_RESPONSE_SUCCESS
        | ProductActionTypes.API_RESPONSE_ERROR
        | ProductActionTypes.GET_PRODUCTS
        | ProductActionTypes.ADD_PRODUCT
        | ProductActionTypes.UPLOAD_IMAGE
        | ProductActionTypes.GET_PRODUCT_DETAILS
        | ProductActionTypes.DELETE_PRODUCT
        | ProductActionTypes.UPDATE_PRODUCT;
    payload: {
        actionType?: string;
        data?: Product[] | Product | any;
        error?: string;
        uploadedUrl?: string;
    };
};

type State = {
    results: Product[];
    createdProduct: Product | {};
    isProductCreated: boolean;
    loading: boolean;
    error: string | null;
    uploadedImage: string | null;
    productDetailsById: Product | null;
};

const Products = (state: State = INIT_STATE, action: ProductActionType): State => {
    const { type, payload } = action;

    switch (type) {
        case ProductActionTypes.API_RESPONSE_SUCCESS: {
            const { actionType, data } = payload;
            switch (actionType) {
                case ProductActionTypes.GET_PRODUCTS:
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : [],
                        loading: false,
                        error: null,
                    };
                case ProductActionTypes.ADD_PRODUCT:
                    return {
                        ...state,
                        createdProduct: data || {},
                        isProductCreated: true,
                        loading: false,
                        error: null,
                    };
                case ProductActionTypes.UPLOAD_IMAGE:
                    return {
                        ...state,
                        uploadedImage: payload.uploadedUrl || null,
                        isProductCreated: true,
                        loading: false,
                        error: null,
                    };
                case ProductActionTypes.GET_PRODUCT_DETAILS:
                    return {
                        ...state,
                        productDetailsById: data || null,
                        loading: false,
                        error: null,
                    };
                case ProductActionTypes.UPDATE_PRODUCT:
                    return {
                        
                        ...state,
                        results: Array.isArray(data) ? data : state.results,
                        loading: false,
                        error: null,
                    };
                case ProductActionTypes.DELETE_PRODUCT:
                    return {
                        ...state,
                        results: Array.isArray(data) ? data : state.results,
                        loading: false,
                        error: null,
                    };
                default:
                    return state;
            }
        }

        case ProductActionTypes.API_RESPONSE_ERROR: {
            const { actionType, error } = payload;
            switch (actionType) {
                case ProductActionTypes.GET_PRODUCTS:
                case ProductActionTypes.ADD_PRODUCT:
                case ProductActionTypes.UPLOAD_IMAGE:
                case ProductActionTypes.GET_PRODUCT_DETAILS:
                case ProductActionTypes.UPDATE_PRODUCT:
                case ProductActionTypes.DELETE_PRODUCT:
                    return {
                        ...state,
                        error: error || 'An error occurred',
                        loading: false,
                    };
                default:
                    return state;
            }
        }

        case ProductActionTypes.GET_PRODUCTS:
        case ProductActionTypes.ADD_PRODUCT:
        case ProductActionTypes.UPLOAD_IMAGE:
        case ProductActionTypes.GET_PRODUCT_DETAILS:
        case ProductActionTypes.UPDATE_PRODUCT:
        case ProductActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                loading: true,
                error: null,
            };

        default:
            return state;
    }
};

export default Products;
