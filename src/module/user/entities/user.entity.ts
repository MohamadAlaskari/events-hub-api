import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
