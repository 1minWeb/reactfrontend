export interface IEvent {
  createdAt: string;
  customerId: number;
  date: string;
  eventName: string;
  id?: number;
  imageUrl: string;
  likedByIds: any[];
  location: string;
  ratingValue: number;
  ratingsCount: number;
  sectionItemId: null;
  updatedAt: string;
  userId: string | null;
}
