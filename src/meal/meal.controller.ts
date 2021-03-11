import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from '../models/meal.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { storage } from '../utils/utils';
import { ImageService } from '../image/image.service';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService, private imageService: ImageService) {
  }

  @Get()
  async allMeals(): Promise<Meal[]> {
    return this.mealService.allMeals();
  }

  @Get(':id')
  async oneMeal(@Param('id') id: number): Promise<Meal> {
    return this.mealService.oneMeal(id);
  }

  @Post()
  async create(@Body() meal: Meal, @Body('restaurantId') restaurantId: number): Promise<Meal | Object> {
    return this.mealService.create(restaurantId, meal);
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('file', storage('./uploads/meal/profileImage')))
  async addMeal(@UploadedFile() file, @Body() meal: Meal, @Body('restaurantId') restaurantId: number): Promise<Object> {
    meal.profileImage = file.filename
    return this.mealService.create(restaurantId, meal);
  }


  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() meal: Meal): Promise<any> {
    return this.mealService.updateOne(id, meal);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<any> {
    return this.mealService.deleteOne(id);
  }

  @Post('profileImage')
  @UseInterceptors(FileInterceptor('file', storage('./uploads/meal/profileImage')))
  async uploadImage(@UploadedFile() file, @Body('mealId') id: number): Promise<Object> {
    return this.mealService.addProfileImage(id, file.filename)
  }

  @Get('profileImage/:imageName')
  async getProfileImage(@Param('imageName') imageName, @Res() res): Promise<Object> {
    const name: string = "uploads/meal/profileImage/" + imageName
    return res.sendFile(path.join(process.cwd(), name));
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('image',5, storage('./uploads/meal/img')))
  async uploadImages(@UploadedFiles() files, @Body('mealId') id: number): Promise<Object> {
    const filename: string[] = files.map(file => file.filename)
    return this.imageService.addMealImages(id, filename)
  }

  @Get('image/:imageName')
  async getImage(@Param('imageName') imageName, @Res() res): Promise<Object> {
    const name: string = "uploads/meal/img/" + imageName
    return res.sendFile(path.join(process.cwd(), name));
  }


}
