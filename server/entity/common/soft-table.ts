import { Entity, Column } from 'typeorm'

@Entity()
export class SoftTable {

    @Column({
        type: "timestamp without time zone",
        nullable: true
    })
    createdAt?: Date;

    @Column({
        type: "timestamp without time zone",
        nullable: true
    })
    updatedAt?: Date;

    @Column({
        type: "timestamp without time zone",
        nullable: true
    })
    lastdeletedAtName?: Date;
}