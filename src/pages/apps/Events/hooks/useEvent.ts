import { useState, useEffect } from 'react';
import eventImgPlaceholder from 'assets/images/products/product-5.jpg';
import { useRedux } from 'hooks';
import { IEvent } from '../types';
import { addEvent, getEvents, updateEventByIdAction, deleteEventByIdAction } from 'redux/actions';
import { useNavigate, useParams } from 'react-router-dom';

export default function useEventDetails() {
    const { dispatch, appSelector } = useRedux();

    // State variables
    const [selectedEventImg, setSelectedEventImg] = useState<string>(eventImgPlaceholder);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const getUserIdFromSessionStorage = () => {
        const user = sessionStorage.getItem('mykratu_user');
        return user ? JSON.parse(user).id : null;
    };

    const params = useParams<{ Id: string }>();
    const eventId = params.Id || '0';

    const INIT_EVENT_DETAILS = {
        eventName: '',
        location: '',
        imageUrl: 'https://d2uw10xs7zocn6.cloudfront.net/happy_ganesh_chaturthi.png',
        date: '',
        userId: getUserIdFromSessionStorage(),
    };

    const [eventDetails, setEventDetails] = useState(INIT_EVENT_DETAILS);

    // Extract relevant properties from the Redux state
    const {
        events,
        totalRecords,
        createdEvent,
        isEventCreated,
        eventDetailsById,
    }: {
        events: IEvent[];
        totalRecords: number;
        createdEvent: IEvent;
        isEventCreated: boolean;
        eventDetailsById: IEvent | null;
    } = appSelector((state: any) => ({
        events: state.Events.results,
        totalRecords: state.Events.totalRecords,
        createdEvent: state.Events.createdEvent,
        isEventCreated: state.Events.isEventCreated,
        eventDetailsById: state.Events.eventDetailsById,
    }));
    /**
     * Fetch all events
     */
    const fetchAllEvents = async () => {
        try {
            dispatch(getEvents({ limit: 10, page: 1 }));
        } catch (err) {
            console.error('Failed to fetch events:', err);
        }
    };
    /**
     * Fetch event details if eventId exists
     */
    useEffect(() => {
        if (eventId !== '0' && eventDetailsById) {
            setEventDetails({
                eventName: eventDetailsById.eventName || '',
                location: eventDetailsById.location || '',
                imageUrl: eventDetailsById.imageUrl || eventImgPlaceholder,
                date: eventDetailsById.date || '',
                userId: eventDetailsById.userId || getUserIdFromSessionStorage(),
            });
        }
    }, [eventId, eventDetailsById]);

    /**
     * Handles the image change
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedEventImg(selectedImg);
        return false;
    };

    /**
     * Handles form field updates
     */
    const handleFormRecord = (event: any) => {
        const field = event.target.id;
        setEventDetails({ ...eventDetails, [field]: event.target.value });
    };

    /**
     * Validates event fields
     */
    const validateFields = () => {
        setTimeout(() => {
            setFormErrors('');
        }, 3000);

        if (!(eventDetails.eventName && eventDetails.date && eventDetails.location)) {
            setFormErrors('Event Name, Event Date, and Location are required');
            return false;
        } else if (eventDetails.eventName.trim() === '') {
            setFormErrors('Enter a valid event name');
            return false;
        } else if (!eventDetails.date || isNaN(new Date(eventDetails.date).getTime())) {
            setFormErrors('Enter a valid event date');
            return false;
        } else if (eventDetails.location.trim() === '') {
            setFormErrors('Enter a valid location');
            return false;
        } else {
            setFormErrors('');
            return true;
        }
    };

    /**
     * Handles form submission
     */
    const onSubmit = async () => {
        if (validateFields()) {
            setLoading(true);
            try {
                if (eventId !== '0') {
                    dispatch(updateEventByIdAction(eventDetails));
                } else {
                    dispatch(addEvent(eventDetails));
                }
                await fetchAllEvents();

                setEventDetails(INIT_EVENT_DETAILS); // Reset event details after submission
                navigate('/apps/events');
            } catch (err) {
                setError('An error occurred while submitting the form.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteAction = (id: any) => {
        dispatch(deleteEventByIdAction(id));
        dispatch(getEvents({ limit: 10, page: 1 }));
    };

    // Return all necessary properties and functions
    return {
        selectedEventImg,
        handleImgChange,
        events,
        totalRecords,
        dispatch,
        createdEvent,
        isEventCreated,
        loading,
        error,
        formErrors,
        eventDetails,
        handleFormRecord,
        onSubmit,
        eventDetailsById,
        setEventDetails,
        handleDeleteAction,
    };
}
