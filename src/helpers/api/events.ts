import axios from 'axios';
import { APICore } from './apiCore';

const api = new APICore();

interface EventDetails {
    eventName: string;
    location: string;
    imageUrl: string;
    date: string;
    userId: string | null;
    media: MediaItem[];
}
interface MediaItem {
    name?: string;
    url: string;
    mediaType: string;
    isPrimary: boolean;
}

function getEvents(params: { limit: number; page: number }) {
    const baseUrl = '/event';
    return api.get(`${baseUrl}`, params);
}

function addEvent(params: { eventDetails: EventDetails }) {
    const baseUrl = '/event';
    return api.create(`${baseUrl}`, params);
}

// Get event details
function getEventDetails(params: { eventId: string }) {
    const baseUrl = `/event/${params?.eventId}`; // Adjust the endpoint URL as per your backend API
    return api.get(`${baseUrl}`, '');
}

// Update event details
function updateEventDetails(params: {
    userId: any;
    id?: string;
    eventName?: string;
    date?: string;
    location?: string;
    imageUrl: string;
}) {
    const baseUrl = `/event/${params.id}`; // Adjust the endpoint URL as per your backend API
    const body = {
        eventName: params.eventName,
        date: params.date,
        location: params.location,
        imageUrl: params.imageUrl,
        customerId: params.userId,
    };
    return api.update(`${baseUrl}`, body);
}
//delete events
function deleteEventByIdApi(params: { eventId: string }) {
    const baseUrl = `/event/${params.eventId}`; // Adjust the endpoint URL as per your backend API
    return api.delete(`${baseUrl}`);
}
export { getEvents, addEvent, getEventDetails, updateEventDetails, deleteEventByIdApi };
