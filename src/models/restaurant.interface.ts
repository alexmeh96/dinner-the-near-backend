import { Meal } from './meal.interface';
import { Image } from './image.interface';

export interface Restaurant {
  id?: number;
  name?: string;
  meals?: Meal[];
  profileImage?: string;
  images?: Image[];
  avgPrice?: number;
  description?: string;
}
