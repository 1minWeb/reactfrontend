import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import customerSaga from './customers/saga';
import layoutSaga from './layout/saga';
import userSaga from './users/saga';
import productSaga from './products/saga';
import serviceSaga from './services/saga';
import EventsSaga from './events/saga';
import PoojariSaga from './poojari/saga';
export default function* rootSaga() {
    yield all([
        authSaga(),
        layoutSaga(),
        userSaga(),
        customerSaga(),
        productSaga(),
        serviceSaga(),
        EventsSaga(),
        PoojariSaga(),
    ]);
}
