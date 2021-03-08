import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { RestaurantEntity } from '../models/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantEntity]),
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController]
})
export class RestaurantModule {}
