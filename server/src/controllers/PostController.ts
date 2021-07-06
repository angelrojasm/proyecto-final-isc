import { getRepository, Repository } from 'typeorm';
import { Post } from '../entities/Post';
import { Group } from '../entities/Group';
import { User } from '../entities/User';
import {
  JsonController,
  Get,
  Post as PostMethod,
  Delete,
  BodyParam,
  Param,
} from 'routing-controllers';
import { EntityFromParam, EntityFromBodyParam } from 'typeorm-routing-controllers-extensions';
import { GroupController } from './GroupController';
import { UserController } from './UserController';

@JsonController('/posts')
export class PostController {
  private postRepository: Repository<Post>;

  constructor() {
    this.postRepository = getRepository(Post);
  }
  public async findById(id: number) {
    return await this.postRepository.findOne(id, {
      relations: ['comments'],
    });
  }
  @Get(`/:id`)
  async getPosts(@Param('id') groupId: number) {
    let group = await new GroupController().findById(groupId);
    return this.postRepository.find({
      where: { postedIn: group.name },
      relations: ['comments'],
    });
  }

  @PostMethod(`/`)
  async save(
    @BodyParam('post') post: Post,
    @BodyParam('groupId') groupId: number,
    @BodyParam('userId') userId: number
  ) {
    let group = await new GroupController().findById(groupId);
    let user = await new UserController().findById(userId);
    post.postedIn = group.name;
    post.postedBy = user.username;
    return this.postRepository.save(post);
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') post: Post) {
    return this.postRepository.remove(post);
  }
}
