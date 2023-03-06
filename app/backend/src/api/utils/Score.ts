import Team from '../../database/models/TeamsModel';
import Match from '../../database/models/MatchModel';

class Score {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  constructor(public team: Team, private _matches: Match[]) {
    this.name = team.teamName;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  verifyAwayTeam(enemyGoals: number, teamGoals: number) {
    if (teamGoals > enemyGoals) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    } else if (enemyGoals > teamGoals) {
      this.totalLosses += 1;
    } else {
      this.totalPoints += 1;
      this.totalDraws += 1;
    }
    this.goalsFavor += teamGoals;
    this.goalsOwn += enemyGoals;
    this.goalsBalance = (this.goalsFavor - this.goalsOwn);
  }

  verifyHomeTeam(teamGoals: number, enemyGoals: number) {
    if (teamGoals > enemyGoals) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    } else if (teamGoals < enemyGoals) {
      this.totalLosses += 1;
    } else {
      this.totalPoints += 1;
      this.totalDraws += 1;
    }
    this.goalsFavor += teamGoals;
    this.goalsOwn += enemyGoals;
    this.goalsBalance = (this.goalsFavor - this.goalsOwn);
  }

  verifyMatch(teamId: number) {
    this._matches.forEach((match) => {
      if (match.homeTeamId === teamId) {
        this.totalGames += 1;
        this.verifyHomeTeam(match.homeTeamGoals, match.awayTeamGoals);
        this.efficiency = Number((Math.round(
          ((this.totalPoints / (this.totalGames * 3)) * 100) * 100,
        ) / 100).toFixed(2));
      }
      if (match.awayTeamId === teamId) {
        this.totalGames += 1;
        this.verifyAwayTeam(match.homeTeamGoals, match.awayTeamGoals);
        this.efficiency = Number((Math.round(
          ((this.totalPoints / (this.totalGames * 3)) * 100) * 100,
        ) / 100).toFixed(2));
      }
    });
  }

  getPoints() {
    this.verifyMatch(this.team.id);
    const finalScore = {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
    return finalScore;
  }
}

export default Score;
