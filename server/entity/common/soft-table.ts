import { Entity, Column, BeforeInsert, BeforeUpdate, BeforeRemove, DeleteDateColumn } from 'typeorm'

@Entity()
export class SoftTable {

    @Column({
        type: 'timestamp without time zone',
        nullable: true
    })
    createdAt?: Date

    @Column({
        type: 'timestamp without time zone',
        nullable: true
    })
    updatedAt?: Date

    @DeleteDateColumn({
        type: 'timestamp without time zone',
        nullable: true
    })
    deletedAt?: Date

    @BeforeInsert()
    newCreationDate() {
        this.createdAt = new Date()
    }

    @BeforeUpdate()
    newUpdateDate() {
        this.updatedAt = new Date()
    }
}