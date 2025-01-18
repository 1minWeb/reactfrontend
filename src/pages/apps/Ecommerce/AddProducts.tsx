/* eslint-disable react-hooks/exhaustive-deps */
import { FileUploader, FormInput, PageTitle } from 'components';
import { t } from 'i18next';
import { Alert, Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import useProductDetails from './hooks/useProductDetails';
import { MediaItem } from './hooks/types';
import ProductTierTable from './ProductTierTable';

const AddProduct = () => {

    const { removeImage,
        setPrimaryImage,
        handleImageUpload,
        handleInputChange,
        handleSubmit,
        addTierItem,
        handleTierChange,
        setModalImage,
        setShowModal,
        formErrors,
        loading,
        productDetails,
        showModal,
        modalImage
    } = useProductDetails();
    const openImageModal = (image: string) => {
        setModalImage(image);
        setShowModal(true);
    };

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Products', path: '/apps/products' },
                    {
                        label: 'Add Product',
                        path: '/apps/products/add',
                        active: true,
                    },
                ]}
                title={t('Add Product')}
            />
            {!loading && (
                <>
                    {Object.keys(formErrors).length > 0 && (
                        <Alert variant="danger" className="my-2">
                            Please fix the following errors:
                            <ul>
                                {Object.values(formErrors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <form>
                                        <FormInput
                                            label={t('Title')}
                                            type="text"
                                            name="title"
                                            placeholder={t('Enter product title')}
                                            containerClass={'mb-2'}
                                            value={productDetails.title}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.title && <small className="text-danger">{formErrors.title}</small>}

                                        <FormInput
                                            label={t('Description')}
                                            type="textarea"
                                            name="description"
                                            placeholder={t('Enter product description')}
                                            containerClass={'mb-2'}
                                            value={productDetails.description}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.description && (
                                            <small className="text-danger">{formErrors.description}</small>
                                        )}

                                        <FormInput
                                            label={t('Category')}
                                            type="text"
                                            name="category"
                                            placeholder={t('Enter product category')}
                                            containerClass={'mb-2'}
                                            value={productDetails.category}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.category && (
                                            <small className="text-danger">{formErrors.category}</small>
                                        )}

                                        <FormInput
                                            label={t('SKU')}
                                            type="text"
                                            name="sku"
                                            placeholder={t('Enter product SKU')}
                                            containerClass={'mb-2'}
                                            value={productDetails.sku}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.sku && <small className="text-danger">{formErrors.sku}</small>}

                                        <FormInput
                                            label={t('Thumbnail URL')}
                                            type="text"
                                            name="thumbnailUrl"
                                            placeholder={t('Enter thumbnail URL')}
                                            containerClass={'mb-2'}
                                            value={productDetails.thumbnailUrl}
                                            onChange={handleInputChange}
                                            disabled={true}
                                        />
                                        {formErrors.thumbnailUrl && (
                                            <small className="text-danger">{formErrors.thumbnailUrl}</small>
                                        )}

                                        <FormInput
                                            label={t('Premium Product')}
                                            type="checkbox"
                                            name="isPremium"
                                            containerClass={'mb-2'}
                                            checked={productDetails.isPremium}
                                            onChange={handleInputChange}
                                        />
                                    </form>
                                    {/* <div className="mb-3 mb-0 text-center">
                                            <Button variant="primary" disabled={loading} onClick={handleSubmit}>
                                                {t('Submit')}
                                            </Button>
                                        </div>
                                    </form> */}
                                </Col>

                                <Col md={6}>
                                    <h5>{t('Upload Product Images')}</h5>
                                    <FileUploader showPreview={false} onFileUpload={handleImageUpload} />
                                    <div
                                        className="image-preview-container"
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                            gap: '20px',
                                            paddingTop: '25px',
                                        }}>
                                        {productDetails.media.length > 0 && productDetails.media.map((media: MediaItem, index: number) => (
                                            <div
                                                key={index}
                                                className="image-preview position-relative p-2 shadow-sm rounded"
                                                style={{
                                                    border: media.isPrimary ? '2px solid #28a745' : '1px solid #ddd',
                                                    textAlign: 'center',
                                                    backgroundColor: '#f9f9f9',
                                                }}>
                                                {/* Close Button */}
                                                <button
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                    style={{
                                                        transform: 'translate(50%, -50%)',
                                                        zIndex: 10,
                                                        borderRadius: '50%',
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage(index);
                                                    }}>
                                                    &times;
                                                </button>
                                                {/* Image Preview */}
                                                <img
                                                    src={media.url}
                                                    alt={`Preview ${index}`}
                                                    className="img-thumbnail"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        marginBottom: '10px',
                                                        borderRadius: '8px',
                                                    }}
                                                    onClick={() => openImageModal(media.url)}
                                                />
                                                {/* Image Name */}
                                                <div
                                                    className="text-truncate text-muted"
                                                    style={{ fontSize: '12px', marginBottom: '5px' }}
                                                    title={media.name || `Image ${index + 1}`}>
                                                    {media.name || t(`Image ${index + 1}`)}
                                                </div>
                                                {/* Set as Primary Button */}
                                                <div>
                                                    <Button
                                                        size="sm"
                                                        variant={media.isPrimary ? 'success' : 'secondary'}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPrimaryImage(index);
                                                        }}>
                                                        {media.isPrimary ? t('Primary') : t('Set as Primary')}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h5>{t('Product Tiers')}</h5>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>{t('Tier Type')}</th>
                                                <th>{t('Actual Price')}</th>
                                                <th>{t('Discount %')}</th>
                                                {/* <th>{t('Currency')}</th> */}
                                                <th>{t('Price with Discount')}</th>
                                                <th>{t('Items Included')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ProductTierTable productDetails={productDetails}
                                                handleTierChange={handleTierChange}
                                                addTierItem={addTierItem} />
                                        </tbody>
                                    </Table>
                                    {/* For Custom Tier can be used Later */}
                                    {/* <div className="d-flex align-items-center mt-3">
                                        <Form.Control
                                            type="text"
                                            placeholder={t('Custom Tier Name')}
                                            className="me-2"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addCustomTier(e.currentTarget.value);
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                        />
                                        <Button variant="link" onClick={() => addCustomTier(t('Custom'))}>
                                            {t('Add Tier')}
                                        </Button>
                                    </div> */}
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col className="text-end">
                                    <Button variant="primary" onClick={handleSubmit}>
                                        {t('Submit')}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                        <Modal.Body>
                            <img src={modalImage} alt="Preview" style={{ width: '100%' }} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
};

export default AddProduct;
