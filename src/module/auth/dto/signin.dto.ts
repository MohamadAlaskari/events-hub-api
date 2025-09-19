import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class  SigninDto {
    @ApiProperty({example:  "johndoe@example.com", description: 'The email of the user'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'password123', description: 'The password of the user', minLength: 5})
    @IsNotEmpty()
    @MinLength(5)
    password: string;
}