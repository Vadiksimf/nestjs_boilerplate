import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SigninCredentialsDto } from './dto/signin-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() signinCredentialsDto: SigninCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinCredentialsDto);
  }
}
