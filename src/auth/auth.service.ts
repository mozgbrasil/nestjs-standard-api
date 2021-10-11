import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Seller } from '../sellers/entities/seller.entity';

@Injectable()
export class AuthService {
  @InjectModel('User') private readonly userMyModel: Model<User>;
  @InjectModel('Seller') private readonly sellerMyModel: Model<Seller>;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async validateCustomer(email: string, password: string): Promise<any> {
    const result = await this.userMyModel.findOne({
      where: { email: email },
    });

    if (!result) {
      throw new UnauthorizedException('Email or Password incorrect');
    }

    const items = result.toJSON();

    return items;
  }

  async validateSeller(email: string, password: string): Promise<any> {
    const result = await this.sellerMyModel.findOne({
      where: { email: email },
    });

    if (!result) {
      throw new UnauthorizedException('Email or Password incorrect');
    }

    const items = result.toJSON();

    return items;
  }
}
