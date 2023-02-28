import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamsRoutes = Router();
const teamsServices = new TeamService();
const teamsController = new TeamController(teamsServices);

teamsRoutes.get('/', (req: Request, res:Response) => teamsController.findAll(req, res));

export default teamsRoutes;