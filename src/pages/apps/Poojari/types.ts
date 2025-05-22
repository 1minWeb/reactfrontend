export interface IPoojari {
    id?: number;
    name: string;
    phone?: string;
    email?: string;
    profilePicture: string;
    languages: string[];
    experience: number;
    rating: number;
    isAvailable: boolean;
    location: string;
    latitude: number;
    longitude: number;
    bio: string;
    isVerified: boolean;
    poojasDone: number;
    poojariMedia: IPoojariMedia[];
    PriestRitual?: IRitual[]; // This is optional, depending on your use case
}

export interface ISpecialization {
    id?: number;
    category: string;
    name: string;
    price: number;
    poojariId?: number;
}

export interface IPoojariMedia {
    id?: number;
    thumbnailUrl: string;
    images: string[];
}

export interface IRitual {
    id?: number;
    name: string;
    description?: string;
    category?: string;
    isActive: boolean;
    defaultPrice?: number;
    services?: any[]; // You may want to define a more specific interface for services
    products?: any[]; // You may want to define a more specific interface for products
    poojaris?: IPoojariRitual[]; // You'll need to define this interface
    createdAt?: Date;
    updatedAt?: Date;
}

// You might also need this interface for the many-to-many relationship
export interface IPoojariRitual {
    poojariId: number;
    ritualId: number;
    price?: number;
    // Add any other fields that might be in this relationship
}
