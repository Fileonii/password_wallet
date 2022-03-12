import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PasswordController } from './password.controller';
import { Password } from './password.entity';
import { PasswordService } from './password.service';

@Module({
  imports: [TypeOrmModule.forFeature([Password]), AuthModule],
  controllers: [PasswordController],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
