import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface ILegalInformation {
  blocks: [];
  time: number;
  version: string;
}

@Entity({ name: 'legal_information' })
export class LegalInformationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'json',
    name: 'legal_information',
    nullable: true,
  })
  legalInformation: ILegalInformation;
}
