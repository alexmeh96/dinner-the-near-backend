import { forwardRef, Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { MealEntity } from '../models/meal.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { RestaurantEntity } from '../models/restaurant.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealEntity]),
    forwardRef(() => RestaurantModule),

    ImageModule
  ],
  providers: [MealService],
  controllers: [MealController],
  exports: [MealService]
})
export class MealModule {}
