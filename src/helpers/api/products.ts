import axios from 'axios';
import { APICore } from './apiCore';

const api = new APICore();

interface MediaItem {
    name?: string;
    url: string;
    mediaType: string;
    isPrimary: boolean;
}

interface Tier {
    tierType: string;
    actualPrice: number;
    discountPer: number;
    currency?: string;
    priceWithDiscount: number;
    itemsIncluded: string[];
}

interface ProductDetails {
    title: string;
    description: string;
    category: string;
    sku: string;
    isPremium: boolean;
    thumbnailUrl: string;
    media: MediaItem[];
    tiers: Tier[]; // Replace `any` with a proper type if known
    createdBy: string;
    updatedBy: string;
}

function getProducts(params: { limit: number; page: number; customerId: number }) {
    const baseUrl = '/admin/products';
    return api.get(`${baseUrl}`, params);
}

function addProduct(params: { productDetails: ProductDetails }) {
    const baseUrl = '/admin/products';
    return api.create(`${baseUrl}`, params);
}
function uploadImageApi(data: any) {
    const formData = new FormData();
    for (const k in data) {
        formData.append(k, data[k]);
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return axios
        .post('/upload', formData, config)
        .then((response) => response)
        .catch((error) => {
            console.error('API error:', error);
            throw error;
        });
}

// Get product details
function getProductDetails(params: { productId: string; customerId: number }) {
    console.log(params.customerId);
    const baseUrl = `/admin/products/${params?.productId}`; // Use productId in the URL
    return api.get(`${baseUrl}`, { customerId: params.customerId });
}

// Update product details
function updateProductDetails(params: {
    id: string;
    title: string;
    description: string;
    sku: string;
    category: string;
    isPremium: boolean;
    thumbnailUrl: string;
    price: number;
    media: Array<{
        id: number;
        url: string;
        mediaType: string;
        isPrimary: boolean;
        productId: string;
        createdAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
    tiersInCart: null | string;
    //reviewCount: number;
    // averageRating: null | number;
    // isFavorite: boolean;
    tiers: Array<{
        id: number;
        tierType: string;
        actualPrice: number;
        discountPer: number;
        priceWithDiscount: number;
        itemsIncluded: string[];
        productId: string;
        sectionItemId: null | string;
        quantity: number;
    }>;
}) {
    const baseUrl = `/products/${params.id}`;
    const body = {
        id: params.id,
        title: params.title,
        description: params.description,
        sku: params.sku,
        category: params.category,
        isPremium: params.isPremium,
        thumbnailUrl: params.thumbnailUrl,
        price: params.price,
        media: params.media,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
        tiersInCart: params.tiersInCart,
        //   reviewCount: params.reviewCount,
        //   averageRating: params.averageRating,
        //   isFavorite: params.isFavorite,
        tiers: params.tiers,
    };
    console.log(body);
    return api.updatePatch(baseUrl, body);
}

//delete products
function deleteProductByIdApi(params: { productId: string }) {
    const baseUrl = `/products/${params.productId}`;
    return api.delete(`${baseUrl}`);
}

export { getProducts, addProduct, uploadImageApi, getProductDetails, updateProductDetails, deleteProductByIdApi };
