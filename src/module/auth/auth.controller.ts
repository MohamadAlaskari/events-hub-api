import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokentype } from 'src/common/utils/types/types';
import { SignupDto } from './dto/signup.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from 'src/common/decorators/api-error-responses.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  
  @Post('signup')
  @ApiOperation( { summary: 'Register a new user and receive a JWT access token' })
  @ApiResponse({ status: 201, description: 'User successfully registered and JWT token issued.' })
  @ApiErrorResponses()
    signup(@Body() signupDto:SignupDto) {
      return this.authService.signup(signupDto);
    }
}

