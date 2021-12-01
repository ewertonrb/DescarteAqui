import{ Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from  'typeorm';
import Image from './Image';

@Entity('create_local')
export default class LocalDeColeta{
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    @Column()
    latitude:number;
    @Column()
    longitude: number;
    @Column()
    about: string;
    @Column()
    instructions: string;
    @Column()
    phone: string;
    @Column()
    horario_funcionamento: string;
    
    @OneToMany(() => Image, image => image.local, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'local_id'})
    images: Image[];
}
