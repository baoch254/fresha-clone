import { UserModel } from '@fresha/shared/data-access/model';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { User } from '../entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper.createMap(UserCreateDto, UserCreateDto);
      mapper.createMap(UserUpdateDto, UserUpdateDto);
      mapper.createMap(User, UserCreateDto);
      mapper.createMap(User, UserModel);
    };
  }
}
