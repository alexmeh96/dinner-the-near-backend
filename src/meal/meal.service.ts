import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantEntity } from '../models/restaurant.entity';
import { Repository } from 'typeorm';
import { MealEntity } from '../models/meal.entity';
import { Meal } from '../models/meal.interface';

@Injectable()
export class MealService {
  constructor(@InjectRepository(MealEntity) private readonly mealRepository: Repository<MealEntity>) {
  }

  async allMeals(): Promise<Meal[]> {
    return this.mealRepository.find();
  }

  async oneMeal(id: number): Promise<Meal> {
    return this.mealRepository.findOne(id);
  }

  async create(meal: Meal): Promise<Meal> {
    return this.mealRepository.save(meal);
  }

  async updateOne(id: number, meal: Meal): Promise<any> {
    return this.mealRepository.update(id, meal);
  }

  async deleteOne(id: number): Promise<any> {
    return this.mealRepository.delete(id);
  }
}
