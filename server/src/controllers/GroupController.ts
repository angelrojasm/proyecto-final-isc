import { getRepository, Repository, Like } from 'typeorm';
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
  QueryParam,
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
    return await this.groupRepository.findOne(id, { relations: ['users'] });
  }

  public async findByName(name: string) {
    return await this.groupRepository.find({ where: { name: name } });
  }
  public async add(group: Group) {
    return await this.groupRepository.save(group);
  }
  @Get(`/:id`)
  async get(@Param('id') id: number) {
    return await this.groupRepository.findOne(id, { relations: ['users'] });
  }

  @Get(`/`)
  async getAll() {
    let groups = await this.groupRepository.find({ relations: ['users'] });
    for (let group of groups) {
      group.totalUsers = group.users.length;
    }
    return groups;
  }

  @Get('/find/:name')
  async getByName(@Param('name') name: string) {
    let groups = await this.groupRepository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['users'],
    });
    for (let group of groups) {
      group.totalUsers = group.users.length;
    }
    return groups;
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
