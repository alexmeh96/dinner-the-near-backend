import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { ImageEntity } from './image.entity';

@Entity({name: 'meal'})
export class MealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => RestaurantEntity, restaurant => restaurant.meals)
  restaurant: RestaurantEntity;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(type => ImageEntity, image => image.meal)
  images: ImageEntity[];
}
