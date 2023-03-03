import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Match from '../../database/models/MatchModel';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchService implements IServiceMatch {
  model: ModelStatic<Match> = Match;

  async findAll(): Promise<Match[]> {
    return this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  async findByProgress(inProgress: boolean): Promise<Match[]> {
    return this.model.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  async finishMatch(postId: number): Promise<{ message: string }> {
    const update = await this.model.update(
      { inProgress: 'false' },
      { where: { id: postId } },
    );

    if (update) return { message: 'finished' };
    return { message: 'match not found' };
  }
}
