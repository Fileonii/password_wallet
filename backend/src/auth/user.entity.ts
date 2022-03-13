import { ApiProperty } from '@nestjs/swagger';
import { Password } from 'src/password/password.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PasswordType } from './crypto-functions';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({ example: "username", description: "Account password username"})
  @Column({ unique: true })
  username: string;
  @ApiProperty({ example: "new-password", description: "Account password (plaintext)"})
  @Column()
  passwordAccount: string;
  @OneToMany(() => Password, (password) => password.user, { eager: true })
  password: Password[];
  @ApiProperty({ example: "sha-256", description: "Method of hashing"})
  @Column()
  passwordType: PasswordType;
  @Column({ nullable: true })
  salt?: string;
}
