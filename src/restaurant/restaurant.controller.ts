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
import { RestaurantService } from './restaurant.service';
import { Restaurant } from '../models/restaurant.interface';
import * as path from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/utils';
import { ImageService } from '../image/image.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService,
              private imageService: ImageService,
  ) {
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

  @Post('profileImage')
  @UseInterceptors(FileInterceptor('file', storage('./uploads/restaurant/profileImage')))
  async uploadFile(@UploadedFile() file, @Body('restaurantId') id: number): Promise<Object> {
    console.log(file);
    return this.restaurantService.addProfileImage(id, file.filename);
  }

  @Get('profileImage/:imageName')
  async getProfileImage(@Param('imageName') imageName, @Res() res): Promise<Object> {
    const name: string = 'uploads/restaurant/profileImage/' + imageName;
    return res.sendFile(path.join(process.cwd(), name));
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('image', 5, storage('./uploads/restaurant/img')))
  async uploadImages(@UploadedFiles() files, @Body('restaurantId') id: number): Promise<Object> {
    const filename: string[] = files.map(file => file.filename);
    return this.imageService.addRestaurantImages(id, filename);
  }

  @Get('image/:imageName')
  async getImage(@Param('imageName') imageName, @Res() res): Promise<Object> {
    const name: string = "uploads/restaurant/img/" + imageName
    return res.sendFile(path.join(process.cwd(), name));
  }
}
