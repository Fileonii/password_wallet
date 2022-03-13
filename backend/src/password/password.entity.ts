import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "facebook", description: "Note for this password"})
  @Column()
  service: string;
  @ApiProperty({ example: "password", description: "Account password username"})
  @Column()
  encryptedPassword: string;
  @ManyToOne(() => User, (user) => user.password, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
