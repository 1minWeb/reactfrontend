import { useState, useEffect } from 'react';
import { useRedux } from 'hooks';
import { IService } from '../types';
import { addService, getServices, updateServiceByIdAction, deleteServiceByIdAction } from 'redux/actions';
import { useNavigate, useParams } from 'react-router-dom';

export default function useServiceDetails() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const [selectedServiceImg, setSelectedServiceImg] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        services,
        totalRecords,
        createdService,
        isServiceCreated,
        serviceDetailsById,
    }: {
        services: IService[];
        totalRecords: number;
        createdService: IService;
        isServiceCreated: boolean;
        serviceDetailsById: IService | null;
    } = appSelector((state: any) => ({
        services: state.Services?.results,
        totalRecords: state.Services?.totalRecords,
        createdService: state.Services?.createdService,
        isServiceCreated: state.Services?.isServiceCreated,
        serviceDetailsById: state.Services?.serviceDetailsById,
    }));

    const params = useParams<{ Id: string }>();
    const serviceId = params.Id || '0';

    const INIT_SERVICE_DETAILS = {
        name: '',
        description: '',
        discount: 0, // Updated to be a number
        reviews: 0,
        rating: 0,
        imageUrl: 'https://d2uw10xs7zocn6.cloudfront.net/happy_ganesh_chaturthi.png',
        price: 0,
    };

    const [serviceDetails, setServiceDetails] = useState(INIT_SERVICE_DETAILS);

    /**
     * Fetch all services
     */
    const fetchAllServices = async () => {
        try {
            dispatch(getServices({ limit: 10, page: 1 }));
        } catch (err) {
            console.error('Failed to fetch services:', err);
        }
    };

    /**
     * Fetch service details if serviceId exists
     */
    useEffect(() => {
        if (serviceId !== '0' && serviceDetailsById) {
            setServiceDetails({
                name: serviceDetailsById.name || '',
                description: serviceDetailsById.description || '',
                discount: serviceDetailsById.discount || 0, // Ensure discount is a number
                reviews: serviceDetailsById.reviews || 0,
                rating: serviceDetailsById.rating || 0,
                imageUrl: serviceDetailsById.imageUrl || '',
                price: serviceDetailsById.price || 0,
            });
        }
    }, [serviceId, serviceDetailsById]);

    /**
     * Handles the image change
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedServiceImg(selectedImg);
        return false;
    };

    /**
     * Handles form field updates
     */
    const handleFormRecord = (event: any) => {
        const field = event.target.name;
        const value = field === 'discount' || field === 'price' ? Number(event.target.value) : event.target.value;
        setServiceDetails({ ...serviceDetails, [field]: value });
    };

    /**
     * Validates service fields
     */
    const validateFields = () => {
        setTimeout(() => {
            setFormErrors('');
        }, 3000);
        if (!(serviceDetails.name && serviceDetails.price && serviceDetails.description)) {
            setFormErrors('Name, Price, and Description are required');
            return false;
        } else if (serviceDetails.name.trim() === '') {
            setFormErrors('Enter a valid service name');
            return false;
        } else if (isNaN(Number(serviceDetails.price)) || Number(serviceDetails.price) <= 0) {
            setFormErrors('Enter a valid price');
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
                if (serviceId !== '0') {
                    dispatch(updateServiceByIdAction(serviceDetails));
                } else {
                    dispatch(addService(serviceDetails));
                }
                await fetchAllServices();
                setServiceDetails(INIT_SERVICE_DETAILS); // Reset service details after submission
                navigate('/apps/services');
            } catch (err) {
                setError('An error occurred while submitting the form.');
            } finally {
                setLoading(false);
            }
        }
    };

    /**
     * Handles delete action
     */
    const handleDeleteAction = (id: any) => {
        dispatch(deleteServiceByIdAction(id));
        dispatch(getServices({ limit: 10, page: 1 }));
    };

    // Return all necessary properties and functions
    return {
        selectedServiceImg,
        handleImgChange,
        services,
        totalRecords,
        dispatch,
        createdService,
        isServiceCreated,
        loading,
        error,
        formErrors,
        serviceDetails,
        handleFormRecord,
        onSubmit,
        serviceDetailsById,
        setServiceDetails,
        handleDeleteAction,
    };
}
