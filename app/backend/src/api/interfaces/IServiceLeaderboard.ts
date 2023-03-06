import IScore from './IScore';

export default interface IServiceMatch {
  leaderboard(): Promise<IScore[]>
  leaderboardHome():Promise<IScore[]>
  leaderboardAway():Promise<IScore[]>
}
