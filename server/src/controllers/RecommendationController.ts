import { getRepository, Repository } from 'typeorm';
import { Recommendations } from '../entities/Recommendations';
import { JsonController, Get, Post, BodyParam, Param } from 'routing-controllers';

@JsonController('/recommendations')
export class RecommendationController {
  private RecommendationRepository: Repository<Recommendations>;

  constructor() {
    this.RecommendationRepository = getRepository(Recommendations);
  }

  @Get(`/:id`)
  async save(@Param('id') userId: number) {
    return this.RecommendationRepository.find({ where: { userId: userId } });
  }
}
