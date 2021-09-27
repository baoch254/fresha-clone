import { UserStorage } from './user.storage';
import { UserService } from './user.service';
import { AutomapperModule } from '@automapper/nestjs';
import { UserProfile } from './mapping';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entity';
import { UserController } from './user.controller';

@Module({
  imports: [AutomapperModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserStorage, UserProfile],
  exports: []
})
export class ApiUserModule {}
