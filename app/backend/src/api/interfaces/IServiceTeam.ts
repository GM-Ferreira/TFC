import Team from '../../database/models/TeamsModel';

export default interface IServiceTeam {
  findAll(): Promise<Team[]>;
  findOne(id:number): Promise<Team>;
}
