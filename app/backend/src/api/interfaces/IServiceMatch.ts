import Match from '../../database/models/MatchModel';

export default interface IServiceMatch {
  findAll(): Promise<Match[]>;
}
