import User from '../../database/models/UserModel';

export default interface IServiceUser {
  findAll(): Promise<User[]>;
  findOne(email: string, password: string): Promise<{ token: string }>;
  findByToken(token: string): Promise<{ role: string }>
}
