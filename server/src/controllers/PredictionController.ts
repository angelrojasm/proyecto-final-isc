import { getRepository, Repository } from 'typeorm';
import { Prediction } from '../entities/Prediction';
import { JsonController, Get, Post, BodyParam, Param } from 'routing-controllers';
import { GroupController } from './GroupController';

@JsonController('/predictions')
export class PredictionController {
  private predictionRepository: Repository<Prediction>;

  constructor() {
    this.predictionRepository = getRepository(Prediction);
  }

  @Post(`/`)
  async save(@BodyParam('label') label: string, @BodyParam('group') groupName: string) {
    const prediction = new Prediction(label, groupName);
    const groupController = new GroupController();
    const groups = await groupController.findByName(groupName);
    const group = groups[0];
    await this.predictionRepository.save(prediction);
    const predictions = await this.predictionRepository.find({ where: { group: groupName } });

    if (predictions.length % 10 == 0) {
      let depCount = 0;
      let anxietyCount = 0;
      let ptsdCount = 0;

      predictions.forEach((prediction) => {
        switch (prediction.label) {
          case 'anxiety':
            anxietyCount++;
            break;
          case 'depression':
            depCount++;
            break;
          case 'ptsd':
            ptsdCount++;
          default:
        }
      });

      group.tags = [];
      if (anxietyCount >= predictions.length * 0.3) {
        group.tags.push('anxiety');
      }
      if (depCount >= predictions.length * 0.3) {
        group.tags.push('depression');
      }
      if (ptsdCount >= predictions.length * 0.3) {
        group.tags.push('ptsd');
      }
    }

    return groupController.add(group);
  }
}
