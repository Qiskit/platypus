import { SectionProgressData } from '@mathigon/studio/server/interfaces';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { SoftTable } from './common/soft-table';

export interface Progression {
    [key: string]: { // course
        [key: string]: SectionProgressData // section
    };
}

@Entity()
export class CommunityUserProgression extends SoftTable {

    @PrimaryGeneratedColumn('uuid')
    communityUserProgressionID!: string;

    @Column({ 
        type: 'json', 
        nullable: true
    })
    progression?: Progression; // TODO: as improvement probably it's better to use an interface here
}