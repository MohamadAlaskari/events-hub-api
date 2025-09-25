import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {
    @ApiProperty({ example: '1A2B3C4D5E', description: 'The unique identifier of the event' } )
    @IsString()
    @IsNotEmpty()
    eventId: string;
}
