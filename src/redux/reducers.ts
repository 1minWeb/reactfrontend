import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import Customer from './customers/reducers';
import Layout from './layout/reducers';
import User from './users/reducers';
import Products from './products/reducers';
import Services from './services/reducers';
import Events from './events/reducers';
import Poojaris from './poojari/reducers';

export default combineReducers({
    Auth,
    Layout,
    User,
    Customer,
    Products,
    Services,
    Events,
    Poojaris,
});
