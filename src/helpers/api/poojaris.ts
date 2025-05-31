import axios from 'axios';
import { APICore } from './apiCore';
import { MediaItem } from 'pages/apps/Ecommerce/hooks/types';

const api = new APICore();
// Poojari interface
interface PoojariDetails {
    name: string;
    description: string;
    expertise: string[];
    experience: number;
    reviews: number;
    rating: number;
    imageUrl: string;
    price: number;
    media: MediaItem[];
}

// Get all poojaris with pagination
function getPoojaris(params: { limit: number; page: number; sortType: string }) {
    const baseUrl = '/poojari/filtered';
    return api.get(`${baseUrl}`, params);
}

// Add a new poojari
function addPoojari(params: { poojariDetails: PoojariDetails }) {
    const baseUrl = '/poojari/createPoojari';
    return api.create(`${baseUrl}`, params);
}

// Get poojari details by ID
function getPoojariDetails(params: { poojariId: string }) {
    const baseUrl = `/poojari/${params?.poojariId}`;
    return api.get(`${baseUrl}`, '');
}

// Update poojari details
function updatePoojariDetails(params: {
    userId: any;
    id?: string;
    name?: string;
    description?: string;
    expertise?: string[];
    experience?: number;
    imageUrl: string;
    reviews: number;
    price: number;
    rating: number;
}) {
    const baseUrl = `/poojari/${params.id}`;
    const body = {
        name: params.name,
        imageUrl: params.imageUrl,
        description: params.description,
        expertise: params.expertise,
        experience: params.experience,
        reviews: params.reviews,
        rating: params.rating,
        price: params.price,
    };
    return api.updatePatch(`${baseUrl}`, body);
}

// Delete poojari by ID
function deletePoojariByIdApi(params: { poojariId: string }) {
    const baseUrl = `/poojari/${params.poojariId}`;
    return api.delete(`${baseUrl}`);
}

export { getPoojaris, addPoojari, getPoojariDetails, updatePoojariDetails, deletePoojariByIdApi };
