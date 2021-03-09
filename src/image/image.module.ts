import { forwardRef, Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealEntity } from '../models/meal.entity';
import { ImageEntity } from '../models/image.entity';
import { MealModule } from '../meal/meal.module';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),
    forwardRef(() => MealModule),
    forwardRef(() => RestaurantModule),
  ],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService]
})
export class ImageModule {}
