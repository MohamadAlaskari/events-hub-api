import { Body, Controller, Post, UseGuards, Request, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokentype } from 'src/common/utils/types/types';
import { SignupDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from '../../common/decorators/api-error-responses.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RefreshDto } from './dto/refresh.dto';

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
  return this.authService.login(req.user);
}

@Get('verify-email')
@ApiOperation({ summary: 'Verify email by Token'})
@ApiQuery({ name: 'token', required: true })
async verifyEmail(@Query('token') token: string) {
  return this.authService.verifyEmail(token);
}

@Post('refresh')
  @ApiOperation({ summary: 'Rotate tokens using refresh token' })
  @ApiBody({ type: RefreshDto })
  @ApiResponse({ status: 200 })
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'Invalidate refresh token for current user' })
  logout(@Request() req) {
    console.log(req.user);
    return this.authService.logout(req.user.sub);
  }

@UseGuards(JwtAuthGuard)
@ApiBearerAuth() 
@Get('profile')
me(@Request() req) {
  return this.authService.getProfile(req.user.sub); 
}
}

