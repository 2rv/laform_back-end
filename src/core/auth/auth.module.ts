import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from '../../config/jwt.config';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './jwt.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(JwtConfig),
    TypeOrmModule.forFeature([UserEntity, UserRepository, AuthRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FacebookStrategy, GoogleStrategy],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
