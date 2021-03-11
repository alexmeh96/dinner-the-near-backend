import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
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
  async allRestaurant(@Res() res) {
    const restaurants = await this.restaurantService.allRestaurant()
    return res.status(HttpStatus.OK).json(restaurants)
  }

  @Get(':id')
  async oneRestaurant(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantService.oneRestaurant(id);
  }

  @Post()
  async create(@Body() restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantService.create(restaurant);
  }

  @Post('full')
  @UseInterceptors(FilesInterceptor('image', 5, storage('./uploads/restaurant/img')))
  @UseInterceptors(FileInterceptor('file', storage('./uploads/restaurant/profileImage')))
  async createFull(@UploadedFile() file, @UploadedFiles() files) {
    console.log(file)
    console.log('#########################################')
    console.log(files)
    return
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
    return this.restaurantService.addProfileImage(id, file.filename);
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('file', storage('./uploads/restaurant/profileImage')))
  async addRestaurant(@UploadedFile() file, @Body() restaurant: Restaurant): Promise<Object> {
    restaurant.profileImage = file.filename
    return this.restaurantService.create(restaurant);
  }

  @Get('profileImage/:imageName')
  async getProfileImage(@Param('imageName') imageName, @Res() res): Promise<Object> {
    const name: string = 'uploads/restaurant/profileImage/' + imageName;
    return res.sendFile(path.join(process.cwd(), name));
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('image', 5, storage('./uploads/restaurant/img')))
  async uploadImages(@UploadedFiles() files, @Body('restaurantId') id: number): Promise<Object> {
    console.log(files)
    const filename: string[] = files.map(file => file.filename);
    return this.imageService.addRestaurantImages(id, filename);
  }

  @Get('image/:imageName')
  async getImage(@Param('imageName') imageName, @Res() res): Promise<Object> {
    const name: string = "uploads/restaurant/img/" + imageName
    return res.sendFile(path.join(process.cwd(), name));
  }
}
