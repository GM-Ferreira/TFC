import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Match from '../../database/models/MatchModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Score from '../utils/Score';
import IScore from '../interfaces/IScore';

export default class LeaderboardService implements IServiceLeaderboard {
  modelMatch: ModelStatic<Match> = Match;
  modelTeam: ModelStatic<Team> = Team;

  async leaderboard():Promise<IScore[]> {
    const teams = await this.modelTeam.findAll();
    const matches = await this.modelMatch.findAll({
      where: { inProgress: 'false' },
    });

    const finalScore = teams.map((team) => {
      const score = new Score(team, matches);
      return score.getPoints();
    });

    return finalScore;
  }
}
