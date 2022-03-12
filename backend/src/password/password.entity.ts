import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  service: string;
  @Column()
  hashedPassword: string;
  @ManyToOne(() => User, (user) => user.password, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
