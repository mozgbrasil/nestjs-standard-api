import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CustomerGuard } from './users/guards/user.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService, // @Inject('RABBIT_PUBLISH_CHANNEL') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    //await this.client.connect();
  }

  @Get()
  getHello() {
    // var message = this.appService.getHello();
    // const data = new Date();
    // const message = 'Hello World! ' + `(${data})`;
    // this.client.emit<any>('create-rmq-channel', new Message(message));
    // return message;
    return this.appService.getHello();
  }

  // @Render('index')
  // render() {
  //   const message = this.appService.getHello();
  //   return { message };
  // }

  // # Passport local
  @UseGuards(AuthGuard('local'))
  @ApiOperation({
    summary: 'Auth Login Local',
    description: 'Create a Auth Login Local',
  })
  @ApiCreatedResponse({ description: 'my ApiCreatedResponse' })
  // @ApiConflictResponse({ description: 'failed login' })
  @Post('auth/login/local')
  async login_local(@Body() createUserDto: CreateUserDto, @Request() req) {
    return req.user;
  }

  // # JWT functionality
  @UseGuards(LocalAuthGuard)
  @Post('auth/login/jwt')
  async login_jwt(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, CustomerGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
