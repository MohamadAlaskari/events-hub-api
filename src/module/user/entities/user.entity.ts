import { Favorite } from "src/module/favorite/entities/favorite.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[];
}
