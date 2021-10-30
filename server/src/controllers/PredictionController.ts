import { getRepository, Repository } from 'typeorm';
import { Prediction } from '../entities/Prediction';
import { Distribution } from '../entities/Distribution';
import { Recommendations } from '../entities/Recommendations';
import { JsonController, Get, Post, BodyParam, Param } from 'routing-controllers';
import { EntityFromBody } from 'typeorm-routing-controllers-extensions';
import calculateCorrelation from 'calculate-correlation';
import { UserController } from './UserController';
import { GroupController } from './GroupController';
@JsonController('/predictions')
export class PredictionController {
  private predictionRepository: Repository<Prediction>;

  constructor() {
    this.predictionRepository = getRepository(Prediction);
  }

  @Post(`/`)
  async save(@EntityFromBody() prediction: Prediction) {
    const predResult = await this.predictionRepository.save(prediction);

    const predictions = await this.predictionRepository.find({
      where: { type: prediction.type, entityId: prediction.entityId },
    });
    //return predictions;
    if (predictions.length >= 1) {
      const values: number[] = [0, 0, 0, 0, 0, 0, 0];
      predictions.forEach((prediction) => {
        prediction.values.forEach((val, idx) => {
          values[idx] += val;
        });
      });
      for (let i = 0; i < values.length; i++) {
        values[i] = values[i] / values.length;
      }
      const distribution = new Distribution(prediction.entityId, prediction.type, values);
      const distributionRepository = getRepository(Distribution);
      await this.predictionRepository.delete({
        type: prediction.type,
        entityId: prediction.entityId,
      });

      if (prediction.type === 'user') {
        const userController = new UserController();

        const user = await userController.findById(prediction.entityId);
        const groups = await distributionRepository.find({ where: { type: 'group' } });

        const vacantGroups = groups.filter((elem) => !user.groups.includes(elem.entityId));

        const recommendedGroups = vacantGroups.filter(
          (group) => calculateCorrelation(distribution.values, group.values) >= 0.55
        );

        const groupIds = [];
        recommendedGroups.forEach((group) => {
          groupIds.push(group.entityId);
        });
        const recommendation = new Recommendations(user.id, groupIds);
        const recommendationRepository = getRepository(Recommendations);
        await recommendationRepository.save(recommendation);
      }
      return distributionRepository.save(distribution);
    }
    return predResult;
  }
}
