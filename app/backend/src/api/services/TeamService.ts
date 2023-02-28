import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';

export default class TeamService {
  model: ModelStatic<Team> = Team;

  async findAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async findOne(id:number): Promise<Team> {
    const result = await this.model.findOne({ where: { id } });

    if (!result) throw new Error('NOT_FOUND');
    return result;
  }
}
