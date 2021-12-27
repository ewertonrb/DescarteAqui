import{ Entity, Column, PrimaryGeneratedColumn} from  'typeorm';


@Entity()
export default class Users{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
