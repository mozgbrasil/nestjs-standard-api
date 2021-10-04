import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateCustomer(email: string, password: string): Promise<any> {
    // const customer = await this.customerRepository.findOne({
    //   where: { email: email },
    // });

    // if (!customer) {
    //   throw new UnauthorizedException('Email or Password incorrect');
    // }

    // const isMatchCustomer = await bcrypt.compare(password, customer.password);
    // if (isMatchCustomer) {
    //   const { password, ...result } = customer;
    //   return result;
    // }

    // throw new UnauthorizedException('Email or Password incorrect');

    console.log('@TODO validateCustomer');

    return '@TODO validateCustomer';
  }

  async validateSeller(email: string, password: string): Promise<any> {
    // const seller = await this.sellerRepository.findOne({
    //   where: { email: email },
    // });

    // if (!seller) {
    //   throw new UnauthorizedException('Email or Password incorrect');
    // }

    // const isMatchSeller = await bcrypt.compare(password, seller.password);
    // if (isMatchSeller) {
    //   const { password, ...result } = seller;
    //   return result;
    // }

    // throw new UnauthorizedException('Email or Password incorrect');
    console.log('@TODO validateSeller');
    return '@TODO validateSeller';
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
