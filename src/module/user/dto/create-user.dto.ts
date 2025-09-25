import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CountryCode } from "../enum/CountryCode.enum";

export class CreateUserDto {
    @ApiProperty({example: 'John Doe', description: 'The full name of the user', maxLength: 40, minLength: 3})   
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    name: string;

    @ApiProperty({example: 'johndoe@example.com', description: 'The email of the user'})
    @IsNotEmpty() 
    @IsEmail() 
    email: string;


    @ApiProperty({example: 'password123', description: 'The password of the user', minLength: 5})
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @ApiProperty({
    example: "DE",
    description:
    "Country code of the user (ISO alpha-2). Default is DE (Germany).",
    enum: CountryCode,
    default: CountryCode.DE,
    required: false,
    })
    @IsEnum(CountryCode)
    country?: CountryCode = CountryCode.DE;

}
