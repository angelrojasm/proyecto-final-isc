import { getRepository, Repository } from 'typeorm';
import { Group } from '../entities/Group';
import { User } from '../entities/User';
import {
  JsonController,
  Get,
  Post,
  Delete,
  BodyParam,
  Param,
  HeaderParams,
} from 'routing-controllers';
import { EntityFromParam, EntityFromBodyParam } from 'typeorm-routing-controllers-extensions';
import { UserController } from './UserController';

@JsonController('/groups')
export class GroupController {
  private groupRepository: Repository<Group>;

  constructor() {
    this.groupRepository = getRepository(Group);
  }
  public async findById(id: number) {
    return await this.groupRepository.findOne(id, { relations: ['users', 'posts', 'files'] });
  }

  @Get(`/:id`)
  async get(@Param('id') id: number) {
    return await this.groupRepository.findOne(id, { relations: ['users', 'posts', 'files'] });
  }

  @Get(`/`)
  getAll() {
    return this.groupRepository.find({ relations: ['users', 'posts', 'files'] });
  }

  @Post(`/`)
  async save(@BodyParam('userId') userId: number, @EntityFromBodyParam('group') group: Group) {
    let user = await new UserController().findById(userId);
    group.totalUsers += 1;

    group.users ? group.users.push(user) : (group.users = [user]);
    return this.groupRepository.save(group);
  }

  @Post(`/removeUser`)
  removeUser(
    @EntityFromBodyParam('userId') user: User,
    @EntityFromBodyParam('groupId') group: Group
  ) {
    const newUsers = group.users.filter((groupUser) => groupUser !== user);
    group.users = newUsers;
    console.log(group);
    return this.groupRepository.save(group);
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') group: Group) {
    return this.groupRepository.remove(group);
  }
}
