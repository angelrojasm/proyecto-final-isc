import { getRepository, Repository } from 'typeorm';
import { File } from '../entities/File';
import { Group } from '../entities/Group';
import { User } from '../entities/User';
import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  BodyParam,
  UploadedFile,
  Param,
} from 'routing-controllers';
import { EntityFromParam, EntityFromBodyParam } from 'typeorm-routing-controllers-extensions';
import * as s3 from '../aws/controller/s3';

@Controller('/files')
export class FileController {
  private fileRepository: Repository<File>;

  constructor() {
    this.fileRepository = getRepository(File);
  }

  @Get(`/:id`)
  getFiles(@Param('id') group: number) {
    return this.fileRepository.find({ where: { uploadedIn: group } });
  }

  @Post(`/`)
  async save(
    @BodyParam('groupId') uploadedIn: number,
    @BodyParam('userId') uploadedBy: number,
    @UploadedFile('file') file: any
  ) {
    const fileObject = new File(file.originalname, uploadedIn, new Date(), uploadedBy);
    const response = await s3.uploadFile(file);
    if (response === 'Ok') {
      return this.fileRepository.save(fileObject);
    } else {
      return { error: response };
    }
  }

  @Delete(`/:id`)
  delete(@EntityFromParam('id') file: File) {
    return this.fileRepository.remove(file);
  }
}
