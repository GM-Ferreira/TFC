import * as express from 'express';
import ErrorHandler from './api/middlewares/handleError';
import matchRoutes from './api/routes/MatchRoutes';
import teamsRoutes from './api/routes/TeamRoutes';
import userRoutes from './api/routes/UserRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    this.initRoutes();
    this.initErrorHandler();
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private initRoutes(): void {
    this.app.use('/teams', teamsRoutes);
    this.app.use('/login', userRoutes);
    this.app.use('/matches', matchRoutes);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initErrorHandler() {
    this.app.use(ErrorHandler.handler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
