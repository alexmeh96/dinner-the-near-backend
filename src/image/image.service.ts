import { Injectable } from '@nestjs/common';
import { Image } from '../models/image.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MealEntity } from '../models/meal.entity';
import { Repository } from 'typeorm';
import { ImageEntity } from '../models/image.entity';
import { MealService } from '../meal/meal.service';
import { Meal } from '../models/meal.interface';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class ImageService {

  constructor(@InjectRepository(ImageEntity) private readonly imageRepository: Repository<ImageEntity>,
              private mealService: MealService,
              private restaurantService: RestaurantService,
              ) {
  }

  async addMealImages(id: number, filenames: string[]): Promise<any> {
    const meal = await this.mealService.oneMeal(id)
    const images: Image[] = []
    for (let i = 0; i < filenames.length; i++) {
      const image: Image = {
        name: filenames[i],
        meal,
      }
      images.push(image)
    }
    return this.imageRepository.save(images);

  }

  async addRestaurantImages(id: number, filenames: string[]): Promise<any> {
    const restaurant = await this.restaurantService.oneRestaurant(id)
    const images: Image[] = []
    for (let i = 0; i < filenames.length; i++) {
      const image: Image = {
        name: filenames[i],
        restaurant,
      }
      images.push(image)
    }
    return this.imageRepository.save(images);
  }
}
