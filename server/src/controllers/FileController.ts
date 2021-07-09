import { getRepository, Repository } from 'typeorm';
import { File } from '../entities/File';
import { Group } from '../entities/Group';
import { User } from '../entities/User';
import { Controller, Get, Post, Delete, Req } from 'routing-controllers';
import { EntityFromParam, EntityFromBodyParam } from 'typeorm-routing-controllers-extensions';
import * as s3 from '../aws/controller/s3';

@Controller('/files')
export class FileController {
  private fileRepository: Repository<File>;

  constructor() {
    this.fileRepository = getRepository(File);
  }

  @Get(`/:id`)
  getFiles(@EntityFromParam('id') group: Group) {
    return this.fileRepository.find({ where: { uploadedIn: group } });
  }

  @Post(`/`)
  async save(
    @EntityFromBodyParam('file') file: File,
    @EntityFromBodyParam('groupId') group: Group,
    @EntityFromBodyParam('userId') user: User,
    @Req() request: any
  ) {
    file.uploadedBy = user.username;
    file.uploadedIn = group.name;
    let { files } = request;
    console.log(files);
    await s3.uploadFile(files.image);
    return this.fileRepository.save(file);
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') file: File) {
    return this.fileRepository.remove(file);
  }
}
