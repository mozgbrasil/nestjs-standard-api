import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';
import { AuthGuard } from '@nestjs/passport';
import { CreateCustomerDto } from './customer/dto/create-customer.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private authService: AuthService, // @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    //await this.client.connect();
  }

  @Get()
  getHello() {
    // var message = this.appService.getHello();
    var data = new Date();
    var message = 'Hello World! ' + `(${data})`;
    // this.client.emit<any>("message_printed", new Message(message));
    // this.client.emit<any>('create-company', new Message(message));
    // return message;
    // return this.appService.getHello();
  }

  // # Passport local
  @UseGuards(AuthGuard('local'))
  @Post('auth/login/local')
  async login_local(
    @Body() createCustomerDto: CreateCustomerDto,
    @Request() req,
  ) {
    return req.user;
  }

  // # JWT functionality
  @UseGuards(LocalAuthGuard)
  @Post('auth/login/jwt')
  async login_jwt(
    @Body() createCustomerDto: CreateCustomerDto,
    @Request() req,
  ) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  // @Todo: Não funciona como esperado pois adiciona ; em posição inesperada, deveria ser adicionado após Authorization, mas não funciona
  @ApiHeader({
    name: 'Authorization ',
    description: 'Custom header',
  })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
