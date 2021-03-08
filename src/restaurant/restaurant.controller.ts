import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from '../models/restaurant.interface';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {
  }

  @Get()
  async allRestaurant(): Promise<Restaurant[]> {

    return this.restaurantService.allRestaurant();
  }

  @Get(':id')
  async oneRestaurant(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantService.oneRestaurant(id);
  }

  @Post()
  async create(@Body() restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantService.create(restaurant);
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() restaurant: Restaurant): Promise<any> {
    return this.restaurantService.updateOne(id, restaurant);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<any> {
    return this.restaurantService.deleteOne(id);
  }

}
