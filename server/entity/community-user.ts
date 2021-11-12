import { Entity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'

import { CommunityUserProgression } from './community-user-progression'
import { SoftTable } from './common/soft-table';

@Entity()
export class CommunityUser extends SoftTable {

    @PrimaryGeneratedColumn('uuid')
    communityUserID!: string;

    @Index({ unique: true })
    @Column()
    email!: string;

    @Column({
        nullable: true
    })
    firstName?: string;

    @Column({
        nullable: true
    })
    lastName?: string;

    @Column({
        nullable: true
    })
    institution?: string;

    @Column({
        nullable: true
    })
    role?: string;

    @Column({ default: false })
    marketingConsent!: boolean;

    @OneToOne(
        () => CommunityUserProgression, 
        communityUserProgression => communityUserProgression.communityUserProgressionID, 
        { cascade: true }
    )
    @JoinColumn()
    communityUserProgression?: CommunityUserProgression;
}

