import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface IPrivacyPolicy {
  blocks: [];
  time: number;
  version: string;
}

@Entity({ name: 'privacy_policy' })
export class PrivacyPolicyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'privacy_policy',
    nullable: true,
  })
  privacyPolicy: IPrivacyPolicy;
}
