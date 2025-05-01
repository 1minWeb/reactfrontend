import { APICore } from './apiCore';

const api = new APICore();

// Get all users
function getAllUsers() {
    const baseUrl = '/users'; // Adjust the endpoint URL as per your backend API
    return api.get(`${baseUrl}`, '');
}

// Update user details
function getUserDetails(params: { userId: string }) {
    const baseUrl = `/users/${params?.userId}`; // Adjust the endpoint URL as per your backend API
    return api.get(`${baseUrl}`, '');
}
// Update user details
function updateUserDetails(params: {
    id?: string;
    firstname?: string;
    lastname?: string;
    companyName?: string;
    email?: string;
    password?: string;
    baseCurrency?: string;
}) {
    const baseUrl = `/users/${params.id}`; // Adjust the endpoint URL as per your backend API
    const body = {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
    };
    return api.create(`${baseUrl}`, body);
}
//Add user
function addUser(params: {
    firstname?: string;
    lastname?: string;
    companyName?: string;
    email?: string;
    role?: string;
    baseCurrency?: string;
}) {
    const baseUrl = `/users`; // Adjust the endpoint URL as per your backend API
    return api.create(`${baseUrl}`, params);
}

// Delete user
function deleteUserByIdApi(params: { userId: string }) {
    const baseUrl = `/users/${params?.userId}`; // Adjust the endpoint URL as per your backend API
    return api.delete(`${baseUrl}`);
}
function getDashboardDataApi(params: { startDate: string; endDate: string }) {
    const baseUrl = `/admin/dashboard?startDate=${params.startDate}&endDate=${params.endDate}`; // Adjust the endpoint URL as per your backend API
    return api.get(`${baseUrl}`, '');
}
export { getAllUsers, updateUserDetails, addUser, deleteUserByIdApi, getUserDetails, getDashboardDataApi };
