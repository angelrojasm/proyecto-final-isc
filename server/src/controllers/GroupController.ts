import { getRepository, Repository, Like } from 'typeorm';
import { Group } from '../entities/Group';
import { JsonController, Get, Post, Delete, BodyParam, Param } from 'routing-controllers';
import { EntityFromParam, EntityFromBodyParam } from 'typeorm-routing-controllers-extensions';
import { UserController } from './UserController';

@JsonController('/groups')
export class GroupController {
  private groupRepository: Repository<Group>;

  constructor() {
    this.groupRepository = getRepository(Group);
  }
  public async findById(id: number) {
    return await this.groupRepository.findOne(id);
  }

  public async findByName(name: string) {
    return await this.groupRepository.find({ where: { name: name } });
  }
  public async add(group: Group) {
    return await this.groupRepository.save(group);
  }
  @Get(`/:id`)
  async get(@Param('id') id: number) {
    return await this.groupRepository.findOne(id);
  }

  @Get(`/`)
  async getAll() {
    let groups = await this.groupRepository.find();
    return groups;
  }

  @Get('/name/:name')
  async getByName(@Param('name') name: string) {
    let groups = await this.groupRepository.find({
      where: { name: Like(`%${name}%`) },
    });
    return groups;
  }
  @Get('/tag/:tag')
  async getByTag(@Param('tag') tag: string) {
    let taggedGroups = [];
    let groups = await this.groupRepository.find();
    for (let group of groups) {
      if (group.tags.includes(tag)) {
        taggedGroups.push(group);
      }
    }
    return taggedGroups;
  }
  @Post(`/`)
  async save(@BodyParam('userId') userId: number, @EntityFromBodyParam('group') group: Group) {
    const userController = new UserController();
    let user = await userController.findById(userId);
    group.totalUsers += 1;
    group.users ? group.users.push(userId) : (group.users = [userId]);
    user.groups.push(group.id);
    await userController.add(user);
    return this.groupRepository.save(group);
  }

  @Post(`/addUser`)
  async addUser(@BodyParam('userId') userId: number, @EntityFromBodyParam('group') group: Group) {
    const userController = new UserController();
    let user = await userController.findById(userId);
    group.users.push(userId);
    group.totalUsers += 1;
    user.groups.push(group.id);
    await userController.add(user);
    return this.groupRepository.save(group);
  }

  @Post(`/removeUser`)
  async removeUser(
    @EntityFromBodyParam('userId') userId: number,
    @EntityFromBodyParam('group') group: Group
  ) {
    const userController = new UserController();
    let user = await userController.findById(userId);
    group.users = group.users.filter((groupUser) => groupUser !== userId);
    group.totalUsers -= 1;
    user.groups = user.groups.filter((userGroup) => userGroup !== group.id);
    await userController.add(user);
    return this.groupRepository.save(group);
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') group: Group) {
    return this.groupRepository.remove(group);
  }
}
