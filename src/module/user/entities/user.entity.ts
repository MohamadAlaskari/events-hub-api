import { Favorite } from "src/module/favorite/entities/favorite.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CountryCode } from "../enum/CountryCode.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")  
    id: string;

    @Column({length: 40}) 
    name: string;
    
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({
    type: "enum",
    enum: CountryCode,
    nullable: false,               
    default: CountryCode.DE,      
    })
    country: CountryCode;

    @Column({ type: 'varchar', nullable: true })
    refreshTokenHash?: string | null;
    

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[];
}
