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

  private async getRelations(user: User) {
    const groupController = new GroupController();
    let newGroups = [];
    for (const id of user.groups) {
      let group = await groupController.findById(id);
      newGroups.push(group);
    }
    user.groups = newGroups;
    return user;
  }

  public async findById(id: number) {
    return await this.userRepository.findOne(id);
  }

  public async add(user: User) {
    return await this.userRepository.save(user);
  }

  @Get(`/:uid`)
  async get(@Param('uid') user: string) {
    return this.getRelations(
      await this.userRepository.findOne({
        where: { uid: user },
        relations: ['groups'],
      })
    );
  }
  @Get(`/find/:name`)
  async getByName(@Param('name') user: string) {
    return await this.userRepository.find({
      where: { username: user },
    });
  }

  @Get(`/`)
  getAll() {
    return this.userRepository.find();
  }

  @Post(`/`)
  async save(@EntityFromBody() user: User) {
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
