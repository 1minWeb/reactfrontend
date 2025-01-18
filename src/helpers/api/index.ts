import { login, logout, signup, forgotPassword, forgotPasswordConfirm } from './auth';
import { getAllUsers, updateUserDetails, addUser, deleteUserByIdApi } from './user';
import { getProducts, addProduct } from './products';
import { getServices } from './services';
import { addEvent, getEvents } from './events';

export {
    login,
    logout,
    signup,
    forgotPassword,
    forgotPasswordConfirm,
    getAllUsers,
    updateUserDetails,
    addUser,
    deleteUserByIdApi,
    getProducts,
    getServices,
    getEvents,
    addProduct,
    addEvent
};
