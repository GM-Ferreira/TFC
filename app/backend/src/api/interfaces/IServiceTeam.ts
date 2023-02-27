import Team from '../../database/models/TeamsModel';

export default interface IServiceTeam {
  findAll(): Promise<Team[]>;
}
