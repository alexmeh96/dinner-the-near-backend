import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MealEntity } from './meal.entity';
import { ImageEntity } from './image.entity';


@Entity({ name: 'restaurant' })
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  avgPrice: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => MealEntity, meal => meal.restaurant)
  meals: MealEntity[];

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(type => ImageEntity, image => image.restaurant)
  images: ImageEntity[];


}
