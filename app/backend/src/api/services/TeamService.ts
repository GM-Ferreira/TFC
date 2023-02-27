import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';

export default class TeamService {
  model: ModelStatic<Team> = Team;

  async findAll(): Promise<Team[]> {
    return this.model.findAll();
  }
}
