import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FileType, FileUploader, FormInput, PageTitle } from 'components';
import { t } from 'i18next';
import { getServiceByIdAction } from 'redux/actions';
import useService from './hooks/useServiceDetails';

const ServiceDetails = () => {
    const {
        dispatch,
        loading,
        formErrors,
        error,
        serviceDetails,
        setServiceDetails,
        handleFormRecord,
        onSubmit,
        isServiceCreated,
        serviceDetailsById,
        handleFileUpload,
    } = useService();

    const params = useParams<{ Id?: string }>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const serviceId = params.Id || '0';

    const [errorOccurred, setErrorOccurred] = useState('');

    // Fetch service details
    useEffect(() => {
        if (serviceId !== '0') {
            dispatch(getServiceByIdAction(serviceId));
        }
    }, []);

    // Sync serviceDetailsById with serviceDetails
    useEffect(() => {
        if (serviceDetailsById && serviceId !== '0') {
            setServiceDetails((prevDetails) => ({
                ...prevDetails,
                ...serviceDetailsById,
            }));
        }
    }, [serviceDetailsById]);

    // Handle error display
    useEffect(() => {
        if (error) {
            setErrorOccurred(error);
            setTimeout(() => {
                setErrorOccurred('');
            }, 3000);
        }
    }, [error]);

    // Navigate back on successful creation
    useEffect(() => {
        if (isServiceCreated) {
            navigate(-1);
        }
    }, [isServiceCreated, navigate]);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Services', path: '/apps/services' },
                    { label: 'Service Details', path: '/apps/services', active: true },
                ]}
                title={t('Service Details')}
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
                                        label={t('Service Name')}
                                        type="text"
                                        name="name"
                                        placeholder={t('Enter Service Name')}
                                        containerClass="mb-2"
                                        value={serviceDetails?.name || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Description')}
                                        type="text"
                                        name="description"
                                        placeholder={t('Enter Service Description')}
                                        containerClass="mb-2"
                                        value={serviceDetails?.description || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Price')}
                                        type="number"
                                        name="price"
                                        placeholder={t('Enter Price')}
                                        containerClass="mb-2"
                                        value={serviceDetails?.price || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Discount')}
                                        type="number"
                                        name="discount"
                                        placeholder={t('Enter Discount Percentage')}
                                        containerClass="mb-2"
                                        value={serviceDetails?.discount || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Reviews')}
                                        type="number"
                                        name="reviews"
                                        placeholder={t('Enter Number of Reviews')}
                                        containerClass="mb-2"
                                        value={serviceDetails?.reviews || ''}
                                        onChange={handleFormRecord}
                                    />
                                    <FormInput
                                        label={t('Rating')}
                                        type="number"
                                        name="rating"
                                        placeholder={t('Enter Rating')}
                                        containerClass="mb-2"
                                        value={serviceDetails?.rating || ''}
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
                                                value={serviceDetails.imageUrl || ''}
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
                                        <Button variant="primary" disabled={loading} onClick={onSubmit}>
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

export default ServiceDetails;
