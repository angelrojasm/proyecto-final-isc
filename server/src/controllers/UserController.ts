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
      relations: ['groups', 'files', 'comments', 'posts'],
    });
  }
  @Get(`/:id`)
  async get(@Param('id') user: User) {
    return await this.userRepository.findOne(user, {
      relations: ['groups', 'files', 'comments', 'posts', 'posts.postedIn'],
    });
  }

  @Get(`/`)
  getAll() {
    return this.userRepository.find({
      relations: ['groups', 'files', 'comments', 'posts'],
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
