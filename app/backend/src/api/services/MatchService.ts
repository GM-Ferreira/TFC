import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Match from '../../database/models/MatchModel';
import IServiceMatch from '../interfaces/IServiceMatch';
import IMatch from '../interfaces/IMatch';

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
    const [affectedCount] = await this.model.update(
      { inProgress: 'false' },
      { where: { id: postId } },
    );

    if (affectedCount !== 0) return { message: 'finished' };
    return { message: 'match not found or alredy finished' };
  }

  async updateGoals(id:number, homeTeamGoals: number, awayTeamGoals: number): Promise<Match> {
    // encontra pelo id
    const [match]:Match[] = await this.model.findAll({
      where: { id },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    // confere se o inProgress é true
    // se false devolve uma mensagem de erro
    if (match.inProgress === false) throw new Error('Match already finished');

    // se true então substitui valores
    match.awayTeamGoals = awayTeamGoals;
    match.homeTeamGoals = homeTeamGoals;
    await match.save();

    return match;
  }

  async creatMatch(data: IMatch): Promise<Match> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = data;

    const newMatch = await this.model.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });

    return newMatch;
  }
}
