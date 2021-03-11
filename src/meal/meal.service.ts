import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealEntity } from '../models/meal.entity';
import { Meal } from '../models/meal.interface';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Image } from '../models/image.interface';

@Injectable()
export class MealService {
  constructor(@InjectRepository(MealEntity) private readonly mealRepository: Repository<MealEntity>,
              private restaurantService: RestaurantService,
  ) {
  }

  async allMeals(): Promise<Meal[]> {
    return this.mealRepository.find();
  }

  async oneMeal(id: number): Promise<Meal> {
    return this.mealRepository.findOne(id, {relations: ['restaurant', 'images']});
  }

  async create(idRestaurant: number, meal: Meal): Promise<Meal> {
    try {
      meal.restaurant = await this.restaurantService.oneRestaurant(idRestaurant);
      return this.mealRepository.save(meal);
    } catch {
      throw Error;
    }
  }

  async updateOne(id: number, meal: Meal): Promise<any> {
    return this.mealRepository.update(id, meal);
  }

  async deleteOne(id: number): Promise<any> {
    return this.mealRepository.delete(id);
  }

  async addProfileImage(id: number, filename: any): Promise<any> {
    return this.updateOne(id, { profileImage: filename });
  }

}
