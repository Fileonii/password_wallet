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
  @Column({ unique: true })
  username: string;
  @Column()
  passwordAccount: string;
  @OneToMany(() => Password, (password) => password.user, { eager: true })
  password: Password[];
  @Column()
  passwordType: PasswordType;
  @Column({ nullable: true })
  salt?: string;
}
