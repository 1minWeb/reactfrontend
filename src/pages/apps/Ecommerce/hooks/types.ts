export interface MediaItem {
    name?: string;
    url: string;
    mediaType: string;
    isPrimary: boolean;
}

export interface Tier {
    tierType: string;
    actualPrice: number;
    discountPer: number;
    currency?: string;
    priceWithDiscount: number;
    itemsIncluded: string[];
}

export interface ProductDetails {
    title: string;
    description: string;
    category: string;
    sku: string;
    isPremium: boolean;
    thumbnailUrl: string;
    media: MediaItem[];
    tiers: Tier[]; // Replace `any` with a proper type if known
}
