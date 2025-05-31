import { useState, useEffect } from 'react';
import { useRedux } from 'hooks';
import { IPoojari } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { getPoojaris, updatePoojariByIdAction, addPoojari, deletePoojariByIdAction } from 'redux/poojari/actions';

export default function usePoojariDetails() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    interface Results {
        count: number;
        poojaris: Poojaris[];
        pagination: Pagination;
    }

    interface Pagination {
        currentPage: number;
        limit: number;
    }

    interface Poojaris {
        id: number;
        name: string;
        profilePicture: string;
        rating: number;
        poojasDone: number;
        experience: number;
        location: string;
        latitude: number;
        longitude: number;
        isAvailable: boolean;
        isVerified: boolean;
        languages: string[];
        bio: string;
        slots: Slot[];
        rituals: Ritual[];
    }

    interface Ritual {
        id: number;
        name: string;
        description: string;
        category: null;
        isActive: boolean;
        defaultPrice: number;
        createdAt: string;
        updatedAt: string;
    }

    interface Slot {
        time: string;
        available: boolean;
    }
    const {
        poojaris,
        results,
        totalRecords,
        createdPoojari,
        isPoojariCreated,
        poojariDetailsById,
        loading,
    }: {
        poojaris: IPoojari[];
        results: Results;
        totalRecords: number;
        createdPoojari: IPoojari;
        isPoojariCreated: boolean;
        poojariDetailsById: IPoojari | null;
        loading: boolean;
    } = appSelector((state: any) => ({
        poojaris: state.Poojaris?.poojaris,
        results: state.Poojaris?.results,
        totalRecords: state.Poojaris?.results.count || 0,
        createdPoojari: state.Poojaris?.createdPoojari,
        isPoojariCreated: state.Poojaris?.isPoojariCreated,
        poojariDetailsById: state.Poojaris?.poojariDetailsById,
        loading: state.Poojaris?.loading,
    }));

    const params = useParams<{ Id: string }>();
    const poojariId = params.Id || '0';

    const INIT_POOJARI_DETAILS: IPoojari = {
        name: '',
        phone: '',
        email: '',
        profilePicture: '',
        languages: [],
        experience: 0,
        rating: 0,
        isAvailable: true,
        location: '',
        latitude: 0,
        longitude: 0,
        bio: '',
        isVerified: false,
        poojasDone: 0,
        poojariMedia: [],
    };

    const [poojariDetails, setPoojariDetails] = useState<IPoojari>(INIT_POOJARI_DETAILS);

    const fetchAllPoojaris = async () => {
        try {
            dispatch(getPoojaris({ limit: 10, page: 1 }));
        } catch (err) {
            console.error('Failed to fetch poojaris:', err);
        }
    };

    useEffect(() => {
        if (poojariId !== '0' && poojariDetailsById) {
            setPoojariDetails({ ...INIT_POOJARI_DETAILS, ...poojariDetailsById });
        }
    }, [poojariId, poojariDetailsById]);

    const handleFormRecord = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPoojariDetails((prevDetails) => ({
            ...prevDetails,
            [name]: ['experience', 'rating', 'latitude', 'longitude', 'poojasDone'].includes(name)
                ? Number(value)
                : value,
        }));
    };

    const validateFields = () => {
        setTimeout(() => setFormErrors(''), 3000);

        if (!poojariDetails.name || !poojariDetails.location) {
            setFormErrors('Name and Location are required');
            return false;
        }
        if (poojariDetails.name.trim() === '') {
            setFormErrors('Enter a valid poojari name');
            return false;
        }
        if (!poojariDetails.email && !poojariDetails.phone) {
            setFormErrors('Either Email or Phone must be provided');
            return false;
        }
        setFormErrors('');
        return true;
    };

    const onSubmit = async () => {
        if (validateFields()) {
            try {
                const updatedPoojariDetails = {
                    ...poojariDetails,
                };
                // if email is empty or undefined, delete it
                if (!poojariDetails.email || poojariDetails.email.trim() === '') {
                    delete updatedPoojariDetails.email;
                }
                if (poojariId !== '0') {
                    dispatch(updatePoojariByIdAction(updatedPoojariDetails));
                } else {
                    dispatch(addPoojari(updatedPoojariDetails));
                }
                await fetchAllPoojaris();
                setPoojariDetails(INIT_POOJARI_DETAILS);
                navigate('/apps/poojari');
            } catch (err) {
                setError('An error occurred while submitting the form.');
            }
        }
    };

    const handleDeleteAction = (id: number) => {
        dispatch(deletePoojariByIdAction(id));
        setTimeout(() => {
            dispatch(getPoojaris({ limit: 10, page: 1 }));
        }, 2000);
    };

    return {
        poojaris,
        totalRecords,
        dispatch,
        createdPoojari,
        isPoojariCreated,
        loading,
        error,
        formErrors,
        poojariDetails,
        handleFormRecord,
        onSubmit,
        poojariDetailsById,
        setPoojariDetails,
        handleDeleteAction,
    };
}
