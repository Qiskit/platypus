import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { SoftTable } from './common/soft-table';

@Entity()
export class CommunityUserProgression extends SoftTable {

    @PrimaryGeneratedColumn('uuid')
    communityUserProgressionID!: string;

    @Column({ 
        type: 'json', 
        nullable: true
    })
    progression?: any; // TODO: as improvement probably it's better to use an interface here
}
