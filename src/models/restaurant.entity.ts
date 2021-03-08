import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MealEntity } from './meal.entity';


@Entity({name: 'restaurant'})
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => MealEntity, meal => meal.restaurant)
  meals: MealEntity[];
}
