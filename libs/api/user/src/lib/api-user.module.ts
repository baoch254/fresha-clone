import { DeleteUserService } from './service/deleteUser.service';
import { AutomapperModule } from '@automapper/nestjs';
import { UserProfile } from './model/mapping';
import {
  CreateUserController,
  DeleteUserController,
  ListUserController,
  UpdateUserController
} from './transport/controller';
import { CreateUserService, ListUserService, UpdateUserService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './model/entity';
import {
  CreateUserStorage,
  DeleteUserStorage,
  ListUserStorage,
  UpdateUserStorage
} from './storage';

@Module({
  imports: [AutomapperModule, TypeOrmModule.forFeature([User])],
  controllers: [
    CreateUserController,
    ListUserController,
    UpdateUserController,
    DeleteUserController
  ],
  providers: [
    CreateUserStorage,
    ListUserStorage,
    CreateUserService,
    ListUserService,
    UpdateUserService,
    UpdateUserStorage,
    DeleteUserService,
    DeleteUserStorage,
    UserProfile
  ],
  exports: []
})
export class ApiUserModule {}
