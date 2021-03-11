import { Restaurant } from './restaurant.interface';
import { Image } from './image.interface';

export interface Meal {
  id?: number;
  name?: string;
  restaurant?: Restaurant;
  profileImage?: string;
  images?: Image[];
  price?:number;
  description?: string;
}
