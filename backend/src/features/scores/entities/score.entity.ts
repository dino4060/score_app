// src/scores/entities/score.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scores_v3')
export class Score {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('int', { nullable: true })
    registrationNumber: number | null;

    @Column('float', { nullable: true })
    math: number | null;

    @Column('float', { nullable: true })
    literature: number | null;

    @Column('float', { nullable: true })
    language2: number | null;

    @Column('float', { nullable: true })
    physics: number | null;

    @Column('float', { nullable: true })
    chemistry: number | null;

    @Column('float', { nullable: true })
    biology: number | null;

    @Column('float', { nullable: true })
    history: number | null;

    @Column('float', { nullable: true })
    geography: number | null;

    @Column('float', { nullable: true })
    civics: number | null;

    @Column('varchar', { length: 10, nullable: true })
    language2Type: string | null;
}
