import { APICore } from './apiCore';

const api = new APICore();

interface ServiceDetails {
    name: string;
    description: string;
    discount: number;
    reviews: number;
    rating: number;
    imageUrl: string;
    price: number;
}

function getServices(params: { limit: number; page: number; tenantId: number }) {
    const baseUrl = '/service';
    return api.get(`${baseUrl}`, params);
}
function addService(params: { serviceDetails: ServiceDetails }) {
    const baseUrl = '/service';
    return api.create(`${baseUrl}`, params);
}

// Get service details
function getServiceDetails(params: { serviceId: string }) {
    const baseUrl = `/service/${params?.serviceId}`; // Adjust the endpoint URL as per your backend API
    return api.get(`${baseUrl}`, '');
}

// Update service details
function updateServiceDetails(params: {
    userId: any; serviceId?: string, name?: string, description?: string, discount?: number,imageUrl:string, reviews:number, price:number,rating:number
}) {
    const baseUrl = `/service/${params.serviceId}`; // Adjust the endpoint URL as per your backend API
    const body = {
        name: params.name,
        imageUrl: params.imageUrl,
        description: params.description,
        discount: params.discount,
        reviews:params.reviews,
        rating: params.rating,
        price: params.price
    };
    return api.updatePatch(`${baseUrl}`, body);
}

//delete services
function deleteServiceByIdApi(params: { serviceId: string }) {
    const baseUrl = `/service/${params.serviceId}`; // Adjust the endpoint URL as per your backend API
    return api.delete(`${baseUrl}`);
}
export { getServices, addService, getServiceDetails,updateServiceDetails,deleteServiceByIdApi };


