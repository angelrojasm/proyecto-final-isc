import { getRepository, Repository, Like } from 'typeorm';
import { Group } from '../entities/Group';
import { JsonController, Get, Post, Delete, BodyParam, Param, Patch } from 'routing-controllers';
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
  public async find() {
    return await this.groupRepository.find();
  }
  public async findByName(name: string) {
    return await this.groupRepository.findOne({ where: { name: name } });
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
    group.region = user.country;
    await this.groupRepository.save(group);
    const createdGroup = await this.findByName(group.name);
    user.groups.push(createdGroup.id);
    await userController.add(user);
    return createdGroup;
  }

  @Post(`/banUser`)
  async banUser(@BodyParam('userId') userId: number, @EntityFromBodyParam('group') group: Group) {
    const userController = new UserController();
    let user = await userController.findById(userId);
    if (group.users[0] !== user.id) {
      group.totalUsers -= 1;
      group.users = group.users.filter((groupUserId) => userId !== groupUserId);
      await this.groupRepository.save(group);
      const createdGroup = await this.findByName(group.name);
      user.groups = user.groups.filter((groupId) => groupId !== createdGroup.id);
      await userController.add(user);
    }
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
    @BodyParam('userId') userId: number,
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

  @Patch('/')
  async update(@BodyParam('groupId') groupId: number, @BodyParam('attributes') attrs: any) {
    return this.groupRepository.save({ id: groupId, ...attrs });
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') group: Group) {
    return this.groupRepository.remove(group);
  }
}
