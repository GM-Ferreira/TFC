import { ModelStatic } from 'sequelize';
import Team from '../../database/models/TeamsModel';
import Match from '../../database/models/MatchModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Score from '../utils/Score';
import IScore from '../interfaces/IScore';

export default class LeaderboardService implements IServiceLeaderboard {
  modelMatch: ModelStatic<Match> = Match;
  modelTeam: ModelStatic<Team> = Team;

  static async sortScore(finalScore: IScore[]) {
    // total points desc
    finalScore.sort((a, b) => {
      if ((b.totalPoints - a.totalPoints) === 0) {
        if ((b.totalVictories - a.totalVictories) === 0) {
          if (b.goalsBalance - a.goalsBalance === 0) {
            if (b.goalsFavor - a.goalsFavor === 0) {
              // 4º Gols sofridos.
              return b.goalsOwn - a.goalsOwn;
            }
            // 3º Gols a favor
            return b.goalsFavor - a.goalsFavor;
          }
          // 2º Saldo de gols
          return b.goalsBalance - a.goalsBalance;
        }
        // 1º Total de Vitórias
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
  }

  async leaderboard():Promise<IScore[]> {
    const teams = await this.modelTeam.findAll();
    const matches = await this.modelMatch.findAll({
      where: { inProgress: 'false' },
    });

    const finalScore = teams.map((team) => {
      const score = new Score(team, matches);
      return score.getPoints();
    });

    await LeaderboardService.sortScore(finalScore);

    return finalScore;
  }
}
