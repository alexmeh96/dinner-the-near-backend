import { Meal } from './meal.interface';

export interface Restaurant {
  id?: number;
  name?: string;
  meals?: Meal[];
}
