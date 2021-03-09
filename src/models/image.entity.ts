import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { MealEntity } from './meal.entity';

@Entity({name: 'image'})
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => RestaurantEntity, restaurant => restaurant.images)
  restaurant: RestaurantEntity;

  @ManyToOne(type => MealEntity, meal => meal.images)
  meal: MealEntity;
}
