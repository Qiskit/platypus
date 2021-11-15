import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { CommunityUser } from './community-user';
import { SoftTable } from './common/soft-table';
import { Progression } from '../interfaces';

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