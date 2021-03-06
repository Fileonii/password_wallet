import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PasswordModule } from 'src/password/password.module';
import { PasswordService } from 'src/password/password.service';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    forwardRef(() => PasswordModule),
    passportModule,
    JwtModule.register({
      secret: 'topSecret51',
      // signOptions: {
      //   expiresIn: 3600,
      // },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, passportModule],
})
export class AuthModule {}
