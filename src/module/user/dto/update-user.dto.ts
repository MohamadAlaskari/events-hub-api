import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional() @IsBoolean() isEmailVerified?: boolean;
    @IsOptional() refreshTokenHash?: string | null;
}
