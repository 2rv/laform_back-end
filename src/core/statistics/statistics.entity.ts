import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'statistics' })
export class StatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
