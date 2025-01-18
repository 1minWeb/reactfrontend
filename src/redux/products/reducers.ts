import { Product } from 'pages/apps/Ecommerce/types';
import { ProductActionTypes } from './constants';

const INIT_STATE = {
    products: {
        results: [],
    },
    createdProduct: {},
    isProductCreated: false,
};

type ProductActionType = {
    type:
        | ProductActionTypes.API_RESPONSE_SUCCESS
        | ProductActionTypes.API_RESPONSE_ERROR
        | ProductActionTypes.GET_PRODUCTS
        | ProductActionTypes.ADD_PRODUCT
        | ProductActionTypes.UPLOAD_IMAGE;
    payload: {
        actionType?: string;
        data?: Product[] | {}|any;
        error?: string;
        uploadedUrl?: any
    };
};

type State = {
    products: {
        results: Product[];
    };
};

const Products = (state: State = INIT_STATE, action: ProductActionType) => {
    switch (action.type) {
        case ProductActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ProductActionTypes.GET_PRODUCTS: {
                    return {
                        results: action.payload.data, // Updating results
                    };
                }
                case ProductActionTypes.ADD_PRODUCT: {
                    return {
                        ...state,
                        createdProduct: action.payload.data, // Updating results
                        isProductCreated: true,
                    };
                }
                case ProductActionTypes.UPLOAD_IMAGE: {
                    return {
                        ...state,
                        uploadedImage: action.payload?.data?.uploadedUrl,
                        isProductCreated: true,
                    };
                }
                default:
                    return { ...state };
            }

        case ProductActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ProductActionTypes.GET_PRODUCTS: {
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                }
                case ProductActionTypes.ADD_PRODUCT: {
                    return {
                        ...state,
                        isProductCreated: false,
                    };
                }
                case ProductActionTypes.UPLOAD_IMAGE: {
                    return {
                        ...state,
                        uploadedImage: null,
                        isProductCreated: false,
                    };
                }
                default:
                    return { ...state };
            }

        case ProductActionTypes.GET_PRODUCTS:
            return { ...state, loading: true };
        case ProductActionTypes.ADD_PRODUCT:
            return { ...state, loading: true };
        case ProductActionTypes.UPLOAD_IMAGE:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
};

export default Products;
