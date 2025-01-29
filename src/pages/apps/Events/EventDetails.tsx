/* eslint-disable react-hooks/exhaustive-deps */
import { FileType, FileUploader, FormInput, PageTitle } from 'components';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventByIdAction } from 'redux/actions';
import useEvent from './hooks/useEventDetails';

const EventDetails = () => {
    const {
        dispatch,
        isEventCreated,
        loading, // Ensure loading is defined in useEvent
        formErrors, // Ensure formErrors is defined in useEvent
        error, // Ensure error is defined in useEvent
        eventDetails, // Add eventDetailsById
        setEventDetails, // Add setEventDetails
        handleFormRecord, // Add handleFormRecord
        onSubmit, // Add onSubmit
        eventDetailsById,
        handleFileUpload,
    } = useEvent();
    const params = useParams<{ Id?: string }>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const eventId = params.Id || '0';

    //const [eventDetails, setEventDetails] = useState(INIT_EVENT_DETAILS);

    useEffect(() => {
        if (eventId !== '0') {
            dispatch(getEventByIdAction(eventId));
        }
    }, []);

    useEffect(() => {
        if (eventDetailsById && eventId !== '0') {
            setEventDetails((prevDetails: any) => ({
                ...prevDetails,
                ...eventDetailsById,
            }));
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
                                    <Row className="mb-2">
                                        {/* Image URL Input */}
                                        <Col md={8}>
                                            <FormInput
                                                label={t('Image URL')}
                                                type="text"
                                                name="imageUrl"
                                                placeholder={t('Enter image URL')}
                                                containerClass={'mb-2'}
                                                value={eventDetails.imageUrl || ''}
                                                onChange={handleFormRecord}
                                                disabled
                                            />
                                        </Col>

                                        {/* File Upload Trigger */}
                                        <Col md={4} className="d-flex align-items-center justify-content-start">
                                            {/* Hidden File Input */}
                                            <input
                                                type="file"
                                                style={{ display: 'none' }}
                                                ref={fileInputRef} // This handles the native input
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (files && files.length > 0) {
                                                        const fileArray = Array.from(files);
                                                        handleFileUpload(fileArray as FileType[]); // Call FileUploader's logic manually
                                                    }
                                                }}
                                            />

                                            {/* Cloud Upload Icon Button */}
                                            <button
                                                type="button"
                                                className="btn btn-light d-flex align-items-center"
                                                onClick={() => fileInputRef.current?.click()} // Trigger hidden file input
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    cursor: 'pointer',
                                                }}>
                                                <i
                                                    className="h3 text-muted dripicons-cloud-upload"
                                                    style={{ marginRight: '0.5rem' }}></i>
                                                {t('Upload File')}
                                            </button>
                                        </Col>
                                    </Row>

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
