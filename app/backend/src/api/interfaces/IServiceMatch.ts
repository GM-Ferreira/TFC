import Match from '../../database/models/MatchModel';

export default interface IServiceMatch {
  findAll(): Promise<Match[]>;
  findByProgress(param: boolean): Promise<Match[]>
  finishMatch(postId: number): Promise<{ message: string }>
}
