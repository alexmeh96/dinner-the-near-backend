import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Entity({name: 'meal'})
export class MealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => RestaurantEntity, restaurant => restaurant.meals)
  restaurant: RestaurantEntity;

}
