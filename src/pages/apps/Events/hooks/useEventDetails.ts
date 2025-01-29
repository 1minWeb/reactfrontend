import { useState, useEffect } from 'react';
import eventImgPlaceholder from 'assets/images/products/product-5.jpg';
import { useRedux } from 'hooks';
import { IEvent } from '../types';
import { addEvent, getEvents, updateEventByIdAction, deleteEventByIdAction } from 'redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { FileType } from 'components';
import { uploadImageApi } from 'helpers/api/products';

export default function useEventDetails() {
    const { dispatch, appSelector } = useRedux();

    // State variables
    const [selectedEventImg, setSelectedEventImg] = useState<string>(eventImgPlaceholder);
    
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
        imageUrl: '',
        date: '',
        userId: getUserIdFromSessionStorage(),
        media: [],
    };

    const [eventDetails, setEventDetails] = useState(INIT_EVENT_DETAILS);

    // Extract relevant properties from the Redux state
    const {
        events,
        totalRecords,
        createdEvent,
        isEventCreated,
        eventDetailsById,
        loading
    }: {
        events: IEvent[];
        totalRecords: number;
        createdEvent: IEvent;
        isEventCreated: boolean;
        eventDetailsById: IEvent | null;
        loading: boolean;
    } = appSelector((state: any) => ({
        events: state.Events.results,
        totalRecords: state.Events.totalRecords,
        createdEvent: state.Events.createdEvent,
        isEventCreated: state.Events.isEventCreated,
        eventDetailsById: state.Events.eventDetailsById,
        loading: state.Events.loading
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
            setEventDetails((prevDetails) => ({
                ...prevDetails,
                eventName: eventDetailsById.eventName || '',
                location: eventDetailsById.location || '',
                imageUrl: eventDetailsById.imageUrl || eventImgPlaceholder,
                date: eventDetailsById.date || '',
                userId: eventDetailsById.userId || getUserIdFromSessionStorage(),
            }));
        }
    }, [eventId, eventDetailsById]);

    /**
     * Handles the image change
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedEventImg(selectedImg);
    };

    /**
     * Handles form field updates
     */
    const handleFormRecord = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    /**
     * Validates event fields
     */
    const validateFields = () => {
        if (!(eventDetails.eventName && eventDetails.date && eventDetails.location)) {
            setFormErrors('Event Name, Event Date, and Location are required');
            return false;
        }
        if (eventDetails.eventName.trim() === '') {
            setFormErrors('Enter a valid event name');
            return false;
        }
        if (!eventDetails.date || isNaN(new Date(eventDetails.date).getTime())) {
            setFormErrors('Enter a valid event date');
            return false;
        }
        if (eventDetails.location.trim() === '') {
            setFormErrors('Enter a valid location');
            return false;
        }
        setFormErrors(null);
        return true;
    };

    /**
     * Handles form submission
     */
    const onSubmit = async () => {
        if (!validateFields()) return;
            let updatedServiceDetails:any  = {...eventDetails}
            updatedServiceDetails.media = undefined
            try {
                if (eventId !== '0') {
                    await dispatch(updateEventByIdAction(updatedServiceDetails));
                } else {
                    await dispatch(addEvent(updatedServiceDetails));
                }
                await fetchAllEvents();

                setEventDetails(INIT_EVENT_DETAILS); // Reset event details after submission
                navigate('/apps/events');
            } catch (err) {
                setError('An error occurred while submitting the form.');
            } finally {
                
            }
        
    };

    /**
     * Handles event deletion
     */
    const handleDeleteAction = (id: number) => {
        dispatch(deleteEventByIdAction(id));
        setTimeout(()=>{
            dispatch(getEvents({ limit: 10, page: 1 }));
        },2000)
    };

    /**
     * Handles image upload
     */
    const handleFileUpload = async (files: FileType[]) => {
      
        try {
            const uploadPromises = files.map(async (file) => {
                const response = await uploadImageApi({ file });
                const image = {
                    url: response.data.uploadedUrl,
                    mediaType: 'IMAGE',
                    isPrimary: false,
                };
                return image;
            });

            const uploadedImages = await Promise.all(uploadPromises);

            setEventDetails((prevDetails:any) => ({
                ...prevDetails,
                media: [...prevDetails.media, ...uploadedImages],
                imageUrl: uploadedImages[0]?.url || prevDetails.imageUrl,
            }));
        } catch (error) {
            console.error('Error uploading images:', error);
        } finally {
         
        }
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
        handleFileUpload,
    };
}
