import { SectionProgressData } from '@mathigon/studio/server/interfaces';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { CommunityUser } from './community-user';
import { SoftTable } from './common/soft-table';

export interface Progression {
    [key: string]: { // course
        [key: string]: SectionProgressData // section
    };
}

@Entity()
export class CommunityUserProgression extends SoftTable {

    @PrimaryGeneratedColumn('uuid')
    communityUserProgressionID!: string

    @Column({ 
        type: 'json', 
        nullable: true
    })
    progression?: Progression

    @OneToOne(() => CommunityUser, communityUser => communityUser.communityUserProgression)
    communityUser!: CommunityUser
}