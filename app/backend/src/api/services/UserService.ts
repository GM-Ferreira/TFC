import { ModelStatic } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import UserModel from '../../database/models/UserModel';
import IPayload from '../interfaces/IPayload';

export default class UserService {
  model: ModelStatic<UserModel> = UserModel;

  static async generateToken(payload: IPayload) {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(payload, secret);
    return token;
  }

  async findAll(): Promise<UserModel[]> {
    return this.model.findAll();
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async findOne(email: string, password: string): Promise<{ token: string }> {
    const user = await this.model.findOne({ where: { email } });
    const isValidPassword = bcrypt.compareSync(password, user?.password || '');

    if (!user || !isValidPassword) throw new Error('Invalid email or password');

    const token = await UserService.generateToken({ content: email });
    return { token };
  }

  async findByToken(token: string): Promise<{ role: string }> {
    // tirar email do jwt
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const payload:IPayload = jwt.verify(token, secret) as IPayload;
    const email = payload.content;

    // pesquisar o email do token
    const user = await this.model.findOne({ where: { email } });

    // erro se nao existir
    if (!user) throw new Error('Invalid email or password');

    // devolver role
    return { role: user.role };
  }
}
