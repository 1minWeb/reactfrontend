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

    const {
        poojaris,
        totalRecords,
        createdPoojari,
        isPoojariCreated,
        poojariDetailsById,
        loading,
    }: {
        poojaris: IPoojari[];
        totalRecords: number;
        createdPoojari: IPoojari;
        isPoojariCreated: boolean;
        poojariDetailsById: IPoojari | null;
        loading: boolean;
    } = appSelector((state: any) => ({
        poojaris: state.Poojaris?.results,
        totalRecords: state.Poojaris?.totalRecords,
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
        specialization: [],
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
        setFormErrors('');
        return true;
    };

    const onSubmit = async () => {
        if (validateFields()) {
            try {
                if (poojariId !== '0') {
                    dispatch(updatePoojariByIdAction(poojariDetails));
                } else {
                    dispatch(addPoojari(poojariDetails));
                }
                await fetchAllPoojaris();
                setPoojariDetails(INIT_POOJARI_DETAILS);
                navigate('/apps/poojaris');
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
