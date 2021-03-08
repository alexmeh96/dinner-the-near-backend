import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { MealEntity } from '../models/meal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealEntity]),
  ],
  providers: [MealService],
  controllers: [MealController]
})
export class MealModule {}
