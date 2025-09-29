import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userId', 'eventId'])
export class Favorite {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    eventId: string;

    @ManyToOne(() => User, user => user.favorites,{
        onDelete: 'CASCADE'
    })
    user: User;

    @Column()
    userId: string;
}
