import Match from '../../database/models/MatchModel';
import IMatch from './IMatch';

export default interface IServiceMatch {
  findAll(): Promise<Match[]>;
  findByProgress(param: boolean): Promise<Match[]>
  finishMatch(postId: number): Promise<{ message: string }>
  updateGoals(id:number, homeGoals: number, awayGoals: number): Promise<Match>
  creatMatch(data: IMatch): Promise<Match>
}
