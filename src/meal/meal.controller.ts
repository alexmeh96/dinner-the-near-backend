import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from '../models/meal.interface';

@Controller('meal')
export class MealController {
  constructor(private mealService: MealService) {
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
  async create(@Body() meal: Meal): Promise<Meal | Object> {
    return this.mealService.create(meal);
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() meal: Meal): Promise<any> {
    return this.mealService.updateOne(id, meal);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<any> {
    return this.mealService.deleteOne(id);
  }
}
