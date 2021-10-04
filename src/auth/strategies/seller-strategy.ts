import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class SellerStrategy extends PassportStrategy(
  Strategy,
  'sellerStrategy',
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const seller = await this.authService.validateSeller(email, password);

    if (!seller) {
      throw new UnauthorizedException();
    }
    return seller;
  }
}
