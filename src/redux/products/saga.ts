import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
// import { APICore, AUTH_SESSION_KEY, setAuthorization } from 'helpers/api/apiCore';
import { getProducts as getProductsApi, addProduct as addProductApi } from 'helpers';
import { productApiResponseSuccess, productApiResponseError } from './actions';
import { ProductActionTypes } from './constants';
import { uploadImageApi } from 'helpers/api/products';

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

export function* watchGetProducts() {
    yield takeEvery(ProductActionTypes.GET_PRODUCTS, getProducts);
}

export function* watchAddProduct() {
    yield takeEvery(ProductActionTypes.ADD_PRODUCT, addProduct);
}
export function* watchUploadImage() {
    yield takeEvery(ProductActionTypes.UPLOAD_IMAGE, uploadImage);
}

function* productSaga() {
    yield all([fork(watchGetProducts), fork(watchAddProduct), fork(watchUploadImage)]);
}

export default productSaga;
