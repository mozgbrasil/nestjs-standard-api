import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('customerStrategy'))
  @ApiOperation({
    summary: "Customer's credentials verification",
    description: 'Verify the credentials and return the customer token',
  })
  @ApiBody({ type: CreateAuthDto })
  // @ApiOkResponse({
  //   description: "Customer's credentials OK",
  //   schema: LoginResponseSchema,
  // })
  @ApiUnauthorizedResponse({ description: 'Email or Password incorrect' })
  @Post('/customer')
  async loginCustomer(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('sellerStrategy'))
  @ApiOperation({
    summary: "Seller's credentials verification",
    description: 'Verify the credentials and return the seller token',
  })
  @ApiBody({ type: CreateAuthDto })
  // @ApiOkResponse({
  //   description: "Seller's credentials OK",
  //   schema: LoginResponseSchema,
  // })
  @ApiUnauthorizedResponse({ description: 'Email or Password incorrect' })
  @Post('/seller')
  async loginSeller(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
