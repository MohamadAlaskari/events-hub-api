import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")  
    id: number;

    @Column({length: 40}) 
    name: string;
    
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isEmailVerified: boolean;
}
