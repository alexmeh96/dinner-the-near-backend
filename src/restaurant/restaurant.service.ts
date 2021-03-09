import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../models/restaurant.entity';
import { Restaurant } from '../models/restaurant.interface';
import { MealService } from '../meal/meal.service';
import { Meal } from '../models/meal.interface';
import path from "path";

@Injectable()
export class RestaurantService {
  constructor(@InjectRepository(RestaurantEntity) private readonly restaurantRepository: Repository<RestaurantEntity>,
  ) {
  }

  async allRestaurant(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({ relations: ['meals'] });
  }

  async oneRestaurant(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne(id);
  }

  async create(restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantRepository.save(restaurant);
  }

  async updateOne(id: number, restaurant: Restaurant): Promise<any> {
    return this.restaurantRepository.update(id, restaurant);
  }

  async deleteOne(id: number): Promise<any> {
    return this.restaurantRepository.delete(id);
  }

  async addProfileImage(id: number, fileName: string): Promise<any> {
    return this.updateOne(id, { profileImage: fileName });
  }

  // async addMeal(idRestaurant: number, meal: Meal): Promise<any> {
  //
  //   try {
  //     const restaurant = await this.oneRestaurant(idRestaurant);
  //     const newMeal = await this.mealService.create(meal);
  //     newMeal.restaurant = restaurant;
  //     return this.mealService.create(newMeal);
  //   } catch {
  //     throw Error;
  //   }
  //
  // }
  addImages(id: number, filename: string[]) {
    return undefined;
  }
}
