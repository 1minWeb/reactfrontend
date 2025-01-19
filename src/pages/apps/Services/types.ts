export interface IService {
  id?: number;
  tenantId?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  reviews: number;
  rating: number;
  imageUrl: string;
  media: MediaItem[];
}
interface MediaItem {
  name?: string;
  url: string;
  mediaType: string;
  isPrimary: boolean;
}