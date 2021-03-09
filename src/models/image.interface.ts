import { Restaurant } from './restaurant.interface';
import { Meal } from './meal.interface';

export interface Image {
  id?: number;
  name?: string;
  meal?: Meal;
  restaurant?: Restaurant;
}
