import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../models/user.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  @Post('login')
  async login(@Body() user: User): Promise<Object> {
    return this.authService.login(user).then((jwt: string) => {
      return {
        access_token: jwt,
        expiresIn: process.env.EXPIRESIN,
      };
    });
  }

  @Post('register')
  async register(@Body('username') username: string,
                 @Body('email') email: string,
                 @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.userService.create({
      username, email, password: hashedPassword,
    });
  }


}
