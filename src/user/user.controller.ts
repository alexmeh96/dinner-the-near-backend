import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return this.userService.findOne(params.id);
  }
}
