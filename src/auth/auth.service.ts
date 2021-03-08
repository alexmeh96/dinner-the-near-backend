import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private userService: UserService,
              ) {
  }

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({user})
  }

  async hasPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  async comparePasswords(newPassword: string, passwordHash: string): Promise<any | boolean> {
    return <any | boolean>bcrypt.compare(newPassword, passwordHash)
  }

  async login(user: User): Promise<string> {
    return this.validateUser(user.email, user.password).then((user: User) => {
      if (user) {
        return this.generateJwt(user)
      } else {
        return 'wrong credentials'
      }
    })
  }

  async validateUser(email: string, password: string): Promise<User> {

    const user: User = await this.userService.findByEmail(email);

    return this.comparePasswords(password, user.password).then((match: boolean) => {
      if (match) {
        const { password, ...result } = user;
        return result;
      } else {
        throw Error;
      }
    });
  }

}
