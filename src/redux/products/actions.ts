import { ProductActionTypes } from './constants';

export type ProductActionType = {
    type:
        | ProductActionTypes.API_RESPONSE_SUCCESS
        | ProductActionTypes.API_RESPONSE_ERROR
        | ProductActionTypes.GET_PRODUCTS
        | ProductActionTypes.ADD_PRODUCT
        | ProductActionTypes.UPLOAD_IMAGE
        | ProductActionTypes.GET_PRODUCT_DETAILS
        | ProductActionTypes.DELETE_PRODUCT
        | ProductActionTypes.UPDATE_PRODUCT
    payload: {} | string;
};

type tier = {
    id: number;
    tierType: string;
    actualPrice: number;
    discountPer: number;
    itemsIncluded: string[];
    productId: string;
    priceWithDiscount: number;
    inCart: boolean;
    quantity: number;
};

type Product = {
    id: string;
    title: string;
    description: string;
    sku: string;
    category: string;
    isPremium: boolean;
    thumbnailUrl: string;
    isActive: boolean;
    price: number;
    tiers: tier[];
    reviewCount: number;
    averageRating: number;
    isFavorite: boolean;
};

// common success
export const productApiResponseSuccess = (actionType: string, data: Product[] | {}): ProductActionType => ({
    type: ProductActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const productApiResponseError = (actionType: string, error: string): ProductActionType => ({
    type: ProductActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getProducts = (params: any): ProductActionType => ({
    type: ProductActionTypes.GET_PRODUCTS,
    payload: params,
});

export const addProduct = (params: any): ProductActionType => ({
    type: ProductActionTypes.ADD_PRODUCT,
    payload: params,
});
export const uploadImage = (params?: any): ProductActionType => ({
    type: ProductActionTypes.UPLOAD_IMAGE,
    payload: params,
});

export const getProductByIdAction = (params?: any): ProductActionType => ({
    type: ProductActionTypes.GET_PRODUCT_DETAILS,
    payload: params 
})

export const updateProductByIdAction = (productData: any): ProductActionType => ({
    type: ProductActionTypes.UPDATE_PRODUCT,
    payload:productData
});

export const deleteProductByIdAction = (productId: string): ProductActionType => ({
    
    type: ProductActionTypes.DELETE_PRODUCT,
    payload: {
        productId
    }
});