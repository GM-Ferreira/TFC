import { NextFunction, Response, Request } from 'express';
import MatchService from '../services/MatchService';

class AreTeamsValids {
  public static async test(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    const service = new MatchService();
    const allMatches = await service.findAll();
    const homeValid = allMatches.find((team) => team.homeTeamId === homeTeamId);
    const awayValid = allMatches.find((team) => team.awayTeamId === homeTeamId);

    if (!homeValid || !awayValid) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}

export default AreTeamsValids;
