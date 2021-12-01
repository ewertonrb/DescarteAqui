import{ Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from  'typeorm';
import LocaldeColeta from './LocaldeColeta';

@Entity('images')
export default class Image{
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(()=> LocaldeColeta, localDeColeta => localDeColeta.images)
    @JoinColumn({name: 'local_id'})
    
    local: LocaldeColeta;
    
}
