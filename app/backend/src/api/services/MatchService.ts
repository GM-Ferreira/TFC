import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Match from '../../database/models/MatchModel';

export default class MatchService {
  model: ModelStatic<Match> = Match;

  async findAll(): Promise<Match[]> {
    return this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }
}
