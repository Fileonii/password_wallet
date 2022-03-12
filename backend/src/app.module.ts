import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, PasswordModule],
})
export class AppModule {}
