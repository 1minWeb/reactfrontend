import { useState, useEffect } from 'react';
import { useRedux } from 'hooks';
import { IService } from '../types';
import { addService, getServices, updateServiceByIdAction, deleteServiceByIdAction } from 'redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { FileType } from 'components';
import { uploadImageApi } from 'helpers/api/products';

export default function useServiceDetails() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const [selectedServiceImg, setSelectedServiceImg] = useState<string>('');
    const [formErrors, setFormErrors] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        services,
        totalRecords,
        createdService,
        isServiceCreated,
        serviceDetailsById,
        loading,
    }: {
        services: IService[];
        totalRecords: number;
        createdService: IService;
        isServiceCreated: boolean;
        serviceDetailsById: IService | null;
        loading: boolean;
    } = appSelector((state: any) => ({
        services: state.Services?.results,
        totalRecords: state.Services?.totalRecords,
        createdService: state.Services?.createdService,
        isServiceCreated: state.Services?.isServiceCreated,
        serviceDetailsById: state.Services?.serviceDetailsById,
        loading: state.Services.loading,
    }));

    const params = useParams<{ Id: string }>();
    const serviceId = params.Id || '0';

    const INIT_SERVICE_DETAILS: IService = {
        name: '',
        description: '',
        discount: 0,
        reviews: 0,
        rating: 0,
        imageUrl: '',
        price: 0,
        media: [],
    };

    const [serviceDetails, setServiceDetails] = useState<IService>(INIT_SERVICE_DETAILS);

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
     * Handles image upload
     */
    const handleFileUpload = async (files: FileType[]) => {
        // setLoading(true);
        try {
            const uploadPromises = files.map(async (file) => {
                const response = await uploadImageApi({ file });
                const image = {
                    url: response.data.uploadedUrl,
                    mediaType: 'IMAGE',
                    isPrimary: false,
                };
                setServiceDetails((prev) => ({
                    ...prev,
                    imageUrl: response.data.uploadedUrl,
                }));
                return image;
            });

            const uploadedImages = await Promise.all(uploadPromises);

            setServiceDetails((prevDetails) => ({
                ...prevDetails,
                media: [...prevDetails?.media, ...uploadedImages],
            }));
        } catch (error) {
            console.error('Error uploading images:', error);
        } finally {
        }
    };

    /**
     * Set primary image
     */
    const setPrimaryImage = (index: number) => {
        setServiceDetails((prevDetails) => {
            const updatedMedia = prevDetails.media.map((item, i) => ({
                ...item,
                isPrimary: i === index,
            }));
            return { ...prevDetails, media: updatedMedia, imageUrl: updatedMedia[index].url };
        });
    };

    /**
     * Remove image
     */
    const removeImage = (index: number) => {
        setServiceDetails((prevDetails) => ({
            ...prevDetails,
            media: prevDetails.media.filter((_, i) => i !== index),
        }));
    };

    /**
     * Fetch service details if serviceId exists
     */
    useEffect(() => {
        if (serviceId !== '0' && serviceDetailsById) {
            setServiceDetails({
                ...INIT_SERVICE_DETAILS,
                ...serviceDetailsById,
            });
        }
    }, [serviceId, serviceDetailsById]);

    /**
     * Handles form field updates
     */
    const handleFormRecord = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setServiceDetails((prevDetails) => ({
            ...prevDetails,
            [name]: ['discount', 'price', 'reviews', 'rating'].includes(name) ? Number(value) : value,
        }));
    };

    /**
     * Validates service fields
     */
    const validateFields = () => {
        setTimeout(() => setFormErrors(''), 3000);

        if (!serviceDetails.name || !serviceDetails.price || !serviceDetails.description) {
            setFormErrors('Name, Price, and Description are required');
            return false;
        }
        if (serviceDetails.name.trim() === '') {
            setFormErrors('Enter a valid service name');
            return false;
        }
        if (isNaN(serviceDetails.price) || serviceDetails.price <= 0) {
            setFormErrors('Enter a valid price');
            return false;
        }
        setFormErrors('');
        return true;
    };

    /**
     * Handles form submission
     */
    const onSubmit = async () => {
        if (validateFields()) {
            console.log(serviceId);
            let updatedServiceDetails: any = { ...serviceDetails };
            updatedServiceDetails.media = undefined;
            try {
                if (serviceId !== '0') {
                    dispatch(updateServiceByIdAction(updatedServiceDetails));
                } else {
                    dispatch(addService(updatedServiceDetails));
                }
                await fetchAllServices();
                setServiceDetails(INIT_SERVICE_DETAILS);
                navigate('/apps/services');
            } catch (err) {
                setError('An error occurred while submitting the form.');
            } finally {
            }
        }
    };
    /** Handles the image changes
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedServiceImg(selectedImg);
        return false;
    };
    /**
     * Handles delete action
     */
    const handleDeleteAction = (id: number) => {
        dispatch(deleteServiceByIdAction(id));
        setTimeout(() => {
            dispatch(getServices({ limit: 10, page: 1 }));
        }, 2000);
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
        handleFileUpload,
        setPrimaryImage,
        removeImage,
    };
}
