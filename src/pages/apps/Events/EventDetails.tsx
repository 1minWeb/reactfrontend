/* eslint-disable react-hooks/exhaustive-deps */
import { FileType, FileUploader, FormInput, PageTitle } from 'components';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventByIdAction } from 'redux/actions';
import useEvent from './hooks/useEvent';

const EventDetails = () => {
    const {
        selectedEventImg,
        handleImgChange,
        events,
        totalRecords,
        dispatch,
        createdEvent,
        isEventCreated,
        loading, // Ensure loading is defined in useEvent
        formErrors, // Ensure formErrors is defined in useEvent
        error, // Ensure error is defined in useEvent
        eventDetails, // Add eventDetailsById
        setEventDetails, // Add setEventDetails
        handleFormRecord, // Add handleFormRecord
        onSubmit, // Add onSubmit
        eventDetailsById
    } = useEvent();

    interface MediaItem {
        name?: string;
        url: string;
        mediaType: string;
        isPrimary: boolean;
    }
    const params = useParams<{ Id?: string }>();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const eventId = params.Id || '0';
    const getUserIdFromSessionStorage = () => {
        const user = sessionStorage.getItem('mykratu_user'); 
        return user ? JSON.parse(user).id : null;
    };
    const INIT_EVENT_DETAILS = {
        eventName: '',
        location: '',
        imageUrl: 'https://d2uw10xs7zocn6.cloudfront.net/happy_ganesh_chaturthi.png',
        date: '',
        userId: getUserIdFromSessionStorage(),
        
    };

    //const [eventDetails, setEventDetails] = useState(INIT_EVENT_DETAILS);

    const handleFileUpload = (files: FileType[]) => {
        const uploadedImages = files.map((file) => ({
            url: file.preview || URL.createObjectURL(file),
            mediaType: 'IMAGE',
            isPrimary: false,
            // name: file.name,
        }));
        setUploadedFiles(files);
        // setEventDetails((prevDetails) => ({
        //     ...prevDetails,
        //     media: [...prevDetails.media, ...uploadedImages],
        // }));
    };



    useEffect(() => {
        if (eventId !== '0') {
            dispatch(getEventByIdAction(eventId));
        }
    }, []);

    useEffect(() => {
        if (eventDetailsById && eventId !== '0') {
            setEventDetails(eventDetailsById);
        }
    }, [eventDetailsById]);
  
    const [errorOccurred, setErrorOccurred] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setErrorOccurred(error);
            setTimeout(() => {
                setErrorOccurred('');
            }, 3000);
        }
    }, [error]);

    useEffect(() => {
        if (isEventCreated) {
          
            navigate(-1);
        }
    }, [isEventCreated, navigate]);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Events', path: '/apps/events' },
                    {
                        label: 'Event Details',
                        path: '/apps/events',
                        active: true,
                    },
                ]}
                title={'Event Details'}
            />
            {!loading && (
                <>
                    {formErrors && (
                        <Alert variant="danger" className="my-2">
                            {formErrors}
                        </Alert>
                    )}
                    {errorOccurred && (
                        <Alert variant="danger" className="my-2">
                            {errorOccurred}
                        </Alert>
                    )}

                    <Card>
                        <Card.Body>
                            <Col
                                md={6}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}>
                                <form>
                                    <FormInput
                                        label={t('Event Name')}
                                        type="text"
                                        name="eventName"
                                        placeholder={t('Enter Event Name')}
                                        containerClass={'mb-2'}
                                        value={eventDetails?.eventName || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Image URL')}
                                        type="text"
                                        name="imageUrl"
                                        placeholder={t('Enter image URL')}
                                        containerClass={'mb-2'}
                                        value={eventDetails.imageUrl || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Date')}
                                        type="datetime-local"
                                        name="date"
                                        placeholder={t('Select date')}
                                        containerClass={'mb-2'}
                                        value={
                                            eventDetails.date
                                                ? new Date(eventDetails.date).toISOString().slice(0, 16)
                                                : ''
                                        }
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            const isoDate = new Date(value).toISOString();
                                            setEventDetails((prevDetails) => ({
                                                ...prevDetails,
                                                [name]: isoDate,
                                            }));
                                        }}
                                    />
                                    <FormInput
                                        label={t('Location')}
                                        type="text"
                                        name="location"
                                        placeholder={t('Enter Event Location')}
                                        containerClass={'mb-2'}
                                        value={eventDetails?.location || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <div className="mb-3 mb-0 text-center">
                                        <Button
                                            variant="primary"
                                            disabled={loading}
                                            onClick={() => {
                                                if (!eventDetails.date) {
                                                    setEventDetails((prevDetails) => ({
                                                        ...prevDetails,
                                                        date: new Date().toISOString(),
                                                    }));
                                                }
                                                onSubmit();
                                            }}>
                                            {t('Submit')}
                                        </Button>
                                    </div>
                                    <FileUploader onFileUpload={handleFileUpload} showPreview={false} />
                                </form>
                            </Col>
                        </Card.Body>
                    </Card>
                </>
            )}
        </>
    );
};

export default EventDetails;
