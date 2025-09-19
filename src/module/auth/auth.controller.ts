import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokentype } from 'src/common/utils/types/types';
import { SignupDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from '../../common/decorators/api-error-responses.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

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

    
@UseGuards(AuthGuard('local'))
@Post('login')
@ApiOperation({ summary: 'Login and receive JWT access token' })
@ApiBody({ type: SigninDto }) // Specify the request body type for Swagger
@ApiResponse({ status: 201, description: 'JWT token issued' })
async login(@Request() req): Promise<AccessTokentype> {
  console.log(req.user); 
  return this.authService.login(req.user);
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth() // zeigt das Schloss-Icon in Swagger
@Get('profile')
me(@Request() req) {
  return req.user; // Payload oder kompletter User je nach JwtStrategy.validate
}
}

