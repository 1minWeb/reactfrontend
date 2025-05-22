import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { PageTitle, FormInput, FileUploader, FileType } from 'components';
import usePoojariDetails from './hooks/usePoojariDetails';
import { IPoojari, IPoojariRitual } from './types';
import PoojariRitualTable from './PoojariRitualTable';
import { getPoojariByIdAction } from 'redux/actions';

type PoojariMedia = {
    thumbnailUrl: string;
    images: string[];
};

const PoojariEdit = () => {
    const {
        dispatch,
        poojariDetails,
        setPoojariDetails,
        handleFormRecord,
        onSubmit,
        error,
        loading,
    } = usePoojariDetails();

    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState<string>('');
    useEffect(() => {
        if (poojariId && poojariId !== '0') {
            dispatch(getPoojariByIdAction(poojariId));
        }
    }
        , []);
    // Handle input changes for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleFormRecord(e as React.ChangeEvent<HTMLInputElement>);
    };

    // Handle ritual changes
    const handleRitualChange = (index: number, field: keyof any, value: any) => {
        setPoojariDetails((prev: any) => ({
            ...prev,
            PriestRitual: (prev.PriestRitual || []).map((ritual: IPoojariRitual, idx: number) =>
                idx === index ? { ...ritual, [field]: value } : ritual
            ),
        }));
    };

    // Add a new ritual item
    const addRitualItem = () => {
        setPoojariDetails((prev: any) => ({
            ...prev,
            PriestRitual: [
                ...(prev.PriestRitual || []),
                { ritualId: '', price: 0, description: '', ritualName: '' } as any,
            ],
        }));
    };

    // Remove an image from poojariMedia
    const removeImage = (index: number) => {
        setPoojariDetails((prev: IPoojari) => ({
            ...prev,
            poojariMedia: (prev.poojariMedia || []).filter((_, idx) => idx !== index),
        }));
    };

    // Set an image as primary
    const setPrimaryImage = (index: number) => {
        setPoojariDetails((prev: IPoojari) => {
            const media = [...(prev.poojariMedia || [])];
            if (media.length > 0) {
                const [primary] = media.splice(index, 1);
                media.unshift(primary);
            }
            return { ...prev, poojariMedia: media };
        });
    };

    // Handle image upload
    const handleImageUpload = (files: FileType[]) => {
        // Process each file in the array
        files.forEach((file: any) => {
            if (file.preview) {
                // If file already has a preview, use it directly
                setPoojariDetails((prev: IPoojari) => ({
                    ...prev,
                    poojariMedia: [
                        ...(prev.poojariMedia || []),
                        {
                            thumbnailUrl: file.preview as string,
                            images: [file.preview as string],
                        },
                    ],
                }));
            } else if (file.file) {
                // If we have a File object, create a preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPoojariDetails((prev: IPoojari) => ({
                        ...prev,
                        poojariMedia: [
                            ...(prev.poojariMedia || []),
                            {
                                thumbnailUrl: reader.result as string,
                                images: [reader.result as string],
                            },
                        ],
                    }));
                };
                reader.readAsDataURL(file.file);
            }
        });
    };

    const params = useParams<{ Id?: string }>();
    const poojariId = params.Id || '0';



    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Poojaris', path: '/apps/poojaris' },
                    {
                        label: 'Edit Poojari', active: true,
                        path: ''
                    },
                ]}
                title={'Edit Poojari'}
            />

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && (
                <>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <form>
                                        <FormInput label="Name" name="name" value={poojariDetails.name || ''} onChange={handleInputChange} />
                                        <FormInput label="Phone" name="phone" value={poojariDetails.phone || ''} onChange={handleInputChange} />
                                        <FormInput label="Email" name="email" value={poojariDetails.email || ''} onChange={handleInputChange} />
                                        <FormInput label="Location" name="location" value={poojariDetails.location || ''} onChange={handleInputChange} />
                                        <FormInput label="Experience" type="number" name="experience" value={poojariDetails.experience || 0} onChange={handleInputChange} />
                                        <FormInput label="Bio" type="textarea" name="bio" value={poojariDetails.bio || ''} onChange={handleInputChange} />
                                    </form>
                                </Col>

                                <Col md={6}>
                                    <h5>Upload Profile Pictures</h5>
                                    <FileUploader onFileUpload={handleImageUpload} />
                                    <div className="image-preview-container mt-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        {(poojariDetails.poojariMedia || []).map((media: PoojariMedia, index: number) => (
                                            <div key={index} className="position-relative">
                                                <img src={media.thumbnailUrl} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} onClick={() => { setModalImage(media.thumbnailUrl); setShowModal(true); }} />
                                                <Button size="sm" variant="danger" onClick={() => removeImage(index)} className="position-absolute top-0 end-0">&times;</Button>
                                                <Button size="sm" variant="success" onClick={() => setPrimaryImage(index)} className="mt-1">Set Primary</Button>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Body>
                            <h5>Poojari Rituals</h5>
                            <PoojariRitualTable rituals={poojariDetails.PriestRitual || []} onChange={handleRitualChange} onAdd={addRitualItem} />
                            <div className="text-end mt-3">
                                <Button variant="primary" onClick={onSubmit}>Save</Button>
                            </div>
                        </Card.Body>
                    </Card>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Body>
                            <img src={modalImage} alt="Preview" className="w-100" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
};

export default PoojariEdit;