import { ChangeEvent, useRef, useState } from 'react';
import productImg1 from 'assets/images/products/product-5.jpg';
import { useRedux, useUser } from 'hooks';
import { Product } from '../types';
import { ProductDetails, Tier } from './types';
import { FileType } from 'components';
import { uploadImageApi } from 'helpers/api/products';
import { addProduct, deleteProductByIdAction, getProducts, updateProductByIdAction } from 'redux/actions';

import { useNavigate, useParams } from 'react-router-dom';

export default function useProductDetails() {
    const { dispatch, appSelector } = useRedux();
    const [selectedProductImg, setSelectedProductImg] = useState<string>(productImg1);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const loggedInUser = useUser()[0];

    const {
        products,
        totalRecords,
        createdProduct,
        isProductCreated,
        uploadedImage,
        loading,
        productDetailsById,
    }: {
        products: Product[];
        totalRecords: number;
        createdProduct: Product;
        isProductCreated: boolean;
        uploadedImage: string;
        loading: boolean;

        productDetailsById: Product | null;
    } = appSelector((state: any) => ({
        products: state.Products.results,
        totalRecords: state.Products.totalRecords,
        createdProduct: state.Products.createdProduct,
        isProductCreated: state.Products.isProductCreated,
        uploadedImage: state.Products.uploadedImage,
        loading: state.Products.loading,
        productDetailsById: state.Products.productDetailsById,
        // loading: state.Products.loading,
    }));

    const [productDetails, setProductDetails] = useState<ProductDetails>({
        title: '',
        description: '',
        category: '',
        sku: '',
        isPremium: false,
        thumbnailUrl: '',
        media: [],
        tiers: [
            {
                tierType: 'Budget',
                actualPrice: 0,
                discountPer: 0,
                // currency: 'INR',
                priceWithDiscount: 0,
                itemsIncluded: [],
                stockAvailable: 100,
            },
            {
                tierType: 'Standard',
                actualPrice: 0,
                discountPer: 0,
                // currency: 'INR',
                priceWithDiscount: 0,
                itemsIncluded: [],
                stockAvailable: 100,
            },
            {
                tierType: 'Premium',
                actualPrice: 0,
                discountPer: 0,
                // currency: 'INR',
                priceWithDiscount: 0,
                itemsIncluded: [],
                stockAvailable: 100,
            },
        ],
    });
    /**
     * Handles the image changes
     */
    const handleImgChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedImg: string) => {
        e.preventDefault();
        setSelectedProductImg(selectedImg);
        return false;
    };
    /**
     * Handles event deletion
     */
    const handleDeleteAction = async (id: string) => {
        await dispatch(deleteProductByIdAction(id));

        setTimeout(() => {
            dispatch(getProducts({ limit: 10, page: 1 }));
        }, 2500);
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!productDetails.title.trim()) errors.title = 'Title is required.';
        if (!productDetails.description.trim()) errors.description = 'Description is required.';
        if (!productDetails.category.trim()) errors.category = 'Category is required.';
        if (!productDetails.sku.trim()) errors.sku = 'SKU is required.';
        if (!productDetails.thumbnailUrl.trim()) errors.thumbnailUrl = 'Thumbnail URL is required.';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value,
        }));
    };

    const handleImageUpload = async (files: FileType[]) => {
        try {
            const uploadPromises = files.map(async (file) => {
                const response: any = await uploadImageApi({ file: file });

                const image = {
                    url: response.data.uploadedUrl,
                    mediaType: 'IMAGE',
                    isPrimary: false,
                };
                setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    media: [...prevDetails.media, image],
                }));
                return response;
            });
            await Promise.all(uploadPromises);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const setPrimaryImage = (index: number) => {
        setProductDetails((prevDetails) => {
            const updatedMedia = prevDetails.media.map((item, i) => ({
                ...item,
                isPrimary: i === index,
            }));
            return { ...prevDetails, media: updatedMedia, thumbnailUrl: updatedMedia[index].url };
        });
    };

    const removeImage = (index: number) => {
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            media: prevDetails.media.filter((_, i) => i !== index),
        }));
    };
    const params = useParams<{ Id?: string }>();
    const productId = params.Id || '0';
    const INIT_PRODUCT_DETAILS: Product = {
        media: [],
        title: '',
        description: '',
        sku: '',
        category: '',
        isPremium: false,
        thumbnailUrl: '',
        isActive: false,
        price: 0,
        tiers: [],
        reviewCount: 0,
        averageRating: 0,
        isFavorite: false,
    };
    /**
     * Fetch all products
     */
    const fetchAllProducts = async () => {
        try {
            dispatch(getProducts({ limit: 10, page: 1 }));
        } catch (err) {
            console.error('Failed to fetch services:', err);
        }
    };
    const handleTierChange = (index: number, field: keyof Tier, value: any) => {
        setProductDetails((prevDetails) => {
            const updatedTiers = [...prevDetails.tiers];
            updatedTiers[index] = {
                ...updatedTiers[index],
                [field]: value,
            };

            if (field === 'actualPrice' || field === 'discountPer') {
                updatedTiers[index].priceWithDiscount =
                    updatedTiers[index].actualPrice -
                    (updatedTiers[index].actualPrice * updatedTiers[index].discountPer) / 100;
            }

            return { ...prevDetails, tiers: updatedTiers };
        });
    };

    const addTierItem = (index: number, item: string) => {
        setProductDetails((prevDetails) => {
            const updatedTiers = [...prevDetails.tiers];
            if (item.trim()) {
                updatedTiers[index].itemsIncluded.push(item);
            }
            return { ...prevDetails, tiers: updatedTiers };
        });
    };
    const onSubmit = async () => {
        if (!validateForm()) return;
        try {
            if (productId !== '0') {
                dispatch(updateProductByIdAction(productDetails));
            } else {
                dispatch(
                    addProduct({
                        productDetails: {
                            ...productDetails,
                            createdBy: loggedInUser.email,
                            updatedBy: loggedInUser.email,
                        },
                    })
                );
            }
            await fetchAllProducts();
            setProductDetails(INIT_PRODUCT_DETAILS);
            navigate('/apps/products');
        } catch (err) {
            console.error('Failed to add product:', err);
        } finally {
        }
    };
    return {
        removeImage,
        setPrimaryImage,
        handleImageUpload,
        handleInputChange,
        validateForm,
        // handleSubmit,
        addTierItem,
        handleTierChange,
        selectedProductImg,
        handleImgChange,
        products,
        totalRecords,
        dispatch,
        createdProduct,
        isProductCreated,
        uploadedImage,
        setModalImage,
        setShowModal,
        formErrors,
        loading,
        productDetails,
        showModal,
        modalImage,
        error,
        setProductDetails,
        onSubmit,
        productDetailsById,
        handleDeleteAction,
    };
}
