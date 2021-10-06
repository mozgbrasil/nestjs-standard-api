import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
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

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  //

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

    var obj = result.toJSON();

    return obj;
  }

  async validateSeller(email: string, password: string): Promise<any> {
    const result = await this.sellerMyModel.findOne({
      where: { email: email },
    });

    if (!result) {
      throw new UnauthorizedException('Email or Password incorrect');
    }

    var obj = result.toJSON();

    return obj;
  }

  async login_b2b(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      accountType: user.accountType,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
