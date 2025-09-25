import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetEventsDto {
    @ApiPropertyOptional({
        description: 'Country code in ISO 3166-1 alpha-2 format (default is DE)',
        example: 'DE',
    })
    @IsOptional()
    @IsString()
    countryCode?: string;


    @ApiPropertyOptional({
    description: 'Startdate im ISO 8601 Format (z.B. 2025-12-10)',
    example: '2025-12-20'
    })
    @IsOptional()
    @IsString()
    startDate?: string;

    @ApiPropertyOptional({
        description: 'number of events to return (default is 10)',
        example: 20,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    size?: number;

    @ApiPropertyOptional({
    description: 'Seitenzahl (Standard: 0)',
    example: 0,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number;
}