import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../models/restaurant.entity';
import { Restaurant } from '../models/restaurant.interface';

@Injectable()
export class RestaurantService {
  constructor(@InjectRepository(RestaurantEntity) private readonly restaurantRepository: Repository<RestaurantEntity>) {
  }

  async allRestaurant(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
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
}
