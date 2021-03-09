import { forwardRef, Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { RestaurantEntity } from '../models/restaurant.entity';
import { MealModule } from '../meal/meal.module';
import { MealEntity } from '../models/meal.entity';
import { MealService } from '../meal/meal.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantEntity]),
    forwardRef(() => MealModule),
    forwardRef(() => ImageModule),
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController],
  exports: [RestaurantService]
})
export class RestaurantModule {}
