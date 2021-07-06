import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import {
  JsonController,
  Get,
  Post,
  Delete,
  Patch,
  BodyParam,
  Body,
  Param,
  QueryParam,
} from 'routing-controllers';
import {
  EntityFromParam,
  EntityFromBody,
  EntityFromBodyParam,
} from 'typeorm-routing-controllers-extensions';
import { GroupController } from './GroupController';

@JsonController('/users')
export class UserController {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async findById(id: number) {
    return await this.userRepository.findOne(id, {
      relations: ['groups'],
    });
  }
  @Get(`/:uid`)
  async get(@Param('uid') user: string) {
    return await this.userRepository.find({
      where: { uid: user },
      relations: ['groups'],
    });
  }
  @Get(`/`)
  async getByName(@QueryParam('name') user: string) {
    return await this.userRepository.find({
      where: { username: user },
      relations: ['groups'],
    });
  }

  @Get(`/`)
  getAll() {
    return this.userRepository.find({
      relations: ['groups'],
    });
  }

  @Post(`/`)
  save(@EntityFromBody() user: User) {
    return this.userRepository.save(user);
  }

  @Post(`/addGroup`)
  async addUGroup(@BodyParam('userId') userId: number, @BodyParam('groupId') groupId: number) {
    let user = await this.findById(userId);
    let group = await new GroupController().findById(groupId);
    group.totalUsers += 1;
    //await groupController.update(group)
    user.groups ? user.groups.push(group) : (user.groups = [group]);
    return this.userRepository.save(user);
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') user: User) {
    return this.userRepository.remove(user);
  }

  @Patch(`/`)
  updateAfflictions(
    @EntityFromBodyParam('id') user: User,
    @BodyParam('afflictions') afflictions: string[]
  ) {
    user.afflictions = afflictions;
    return this.userRepository.save(user);
  }
}
