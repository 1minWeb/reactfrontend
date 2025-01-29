import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
// import { APICore, AUTH_SESSION_KEY, setAuthorization } from 'helpers/api/apiCore';
import { getProducts as getProductsApi, addProduct as addProductApi } from 'helpers';
import { productApiResponseSuccess, productApiResponseError } from './actions';
import { ProductActionTypes } from './constants';
import { deleteProductByIdApi, getProductDetails, updateProductDetails, uploadImageApi } from 'helpers/api/products';

// type UserData = {
//     payload: {
//         username: string;
//         firstname: string;
//         lastname: string;
//         companyName: string;
//         email: string;
//         password: string;
//         baseCurrency: string;
//     };
//     type: string;
// };

// const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* getProducts({ payload: { limit, page, customerId } }: any): SagaIterator {
    try {
        const response = yield call(getProductsApi, { limit, page, customerId });
        const products = response.data?.results;
        yield put(productApiResponseSuccess(ProductActionTypes.GET_PRODUCTS, products));
    } catch (error: any) {
        console.log('coming here err', error);
        yield put(productApiResponseError(ProductActionTypes.GET_PRODUCTS, error));
    }
}

function* addProduct({ payload: { productDetails } }: any): SagaIterator {
    try {
        console.log('productDetails', productDetails);
        const response = yield call(addProductApi, { ...productDetails });
        const createdProduct = response?.data;
        yield put(productApiResponseSuccess(ProductActionTypes.ADD_PRODUCT, createdProduct));
    } catch (error: any) {
        console.log('coming here err', error);
        yield put(productApiResponseError(ProductActionTypes.ADD_PRODUCT, error));
    }
}
function* uploadImage(payload: any): SagaIterator {
    try {
        console.log(payload)
        const response = yield call(uploadImageApi, { file: payload.file });
        const createdProduct = response?.data;
        yield put(productApiResponseSuccess(ProductActionTypes.UPLOAD_IMAGE, createdProduct));
    } catch (error: any) {
        console.log('coming here err', error);
        yield put(productApiResponseError(ProductActionTypes.UPLOAD_IMAGE, error));
    }
}

function* getProductDetailsByIdSaga(action: any): SagaIterator {
    try {
        console.log(action)
        const response = yield call(getProductDetails, action.payload);
        const productDetails = response.data;
        yield put(productApiResponseSuccess(ProductActionTypes.GET_PRODUCT_DETAILS, productDetails));
    } catch (error: any) {
        yield put(productApiResponseError(ProductActionTypes.GET_PRODUCT_DETAILS, error));
    }
}
function* updateProductByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(updateProductDetails, action.payload); 
        const updatedProductDetails = response.data;
        yield put(productApiResponseSuccess(ProductActionTypes.UPDATE_PRODUCT, updatedProductDetails));
    } catch (error: any) {
        yield put(productApiResponseError(ProductActionTypes.UPDATE_PRODUCT, error));
    }
}

function* deleteProductByIdSaga(action: any): SagaIterator {
    try {
        const response = yield call(deleteProductByIdApi, action.payload); 
        const productList = response.data; 
        yield put(productApiResponseSuccess(ProductActionTypes.DELETE_PRODUCT, productList));
    } catch (error: any) {
        yield put(productApiResponseError(ProductActionTypes.DELETE_PRODUCT, 'Failed to delete User'));
    }
}

export function* watchGetProducts() {
    yield takeEvery(ProductActionTypes.GET_PRODUCTS, getProducts);
}

export function* watchAddProduct() {
    yield takeEvery(ProductActionTypes.ADD_PRODUCT, addProduct);
}
export function* watchUploadImage() {
    yield takeEvery(ProductActionTypes.UPLOAD_IMAGE, uploadImage);
}

export function* watchUpdateProductById() {
    yield takeEvery(ProductActionTypes.UPDATE_PRODUCT, updateProductByIdSaga);
}
export function* watchGetProductDetailsById() {
    yield takeEvery(ProductActionTypes.GET_PRODUCT_DETAILS, getProductDetailsByIdSaga);
}
export function* watchDeleteProductById() {
    yield takeEvery(ProductActionTypes.DELETE_PRODUCT, deleteProductByIdSaga);
}
function* productSaga() {
    yield all([fork(watchGetProducts), fork(watchAddProduct), fork(watchUploadImage), fork(watchGetProductDetailsById),
            fork(watchUpdateProductById),
            fork(watchDeleteProductById)]);
}

export default productSaga;
