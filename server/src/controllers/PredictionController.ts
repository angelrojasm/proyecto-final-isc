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
    if (predictions.length >= 10) {
      const values: number[] = [0, 0, 0, 0, 0, 0, 0];
      predictions.forEach((prediction) => {
        prediction.values.forEach((val, idx) => {
          values[idx] += Number(val);
        });
      });
      for (let i = 0; i < values.length; i++) {
        values[i] = values[i] / predictions.length;
      }
      const distributionRepository = getRepository(Distribution);
      let distribution = await distributionRepository.findOne({
        where: { entityId: prediction.entityId, type: prediction.type },
      });
      if (!distribution) {
        distribution = new Distribution(prediction.entityId, prediction.type, values);
      } else {
        distribution.values = values;
      }
      await this.predictionRepository.delete({
        type: prediction.type,
        entityId: prediction.entityId,
      });

      if (prediction.type === 'user') {
        const userController = new UserController();

        const user = await userController.findById(prediction.entityId);
        const groups = await distributionRepository.find({ where: { type: 'group' } });
        user.groups = user.groups.map(Number);
        const vacantGroups = groups.filter((elem) => !user.groups.includes(elem.entityId));
        const correlations = [];
        if (vacantGroups && vacantGroups.length > 0) {
          const recommendedGroups = vacantGroups.filter((group) => {
            group.values = group.values.map(Number);
            distribution.values = distribution.values.map(Number);
            const corr = calculateCorrelation(distribution.values, group.values);
            if (corr >= 0.55) {
              correlations.push(corr);
              return true;
            }
          });

          const groupIds = [];
          recommendedGroups.forEach((group) => {
            groupIds.push(group.entityId);
          });
          const recommendationRepository = getRepository(Recommendations);
          let recommendations = await recommendationRepository.findOne({
            where: { userId: user.id },
          });
          if (!recommendations) {
            recommendations = new Recommendations(user.id, groupIds, correlations);
          } else {
            recommendations.groups = groupIds;
            recommendations.correlations = correlations;
          }
          await recommendationRepository.save(recommendations);
        }
      }
      return distributionRepository.save(distribution);
    }
    return predResult;
  }
}
