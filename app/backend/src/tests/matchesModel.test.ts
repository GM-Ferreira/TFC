import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import MatchService from '../api/services/MatchService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /matches', () => {
  const team1 = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  };
  const team2 = {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  };

  const outputFindAll: Match[] = [new Match(team1)];

  afterEach(()=>{
    sinon.restore();
  })

  // it('Deve testar a rota inicial / com sucesso', async () => {
  //   // Arrange
  //   const content = {
  //     ok: true,
  //   }
  //   // Action
  //   const response = await chai.request(app).get('/');

  //   // Assertion
  //   expect(response.status).to.be.equal(200);   
  //   expect(response.body).to.be.deep.equal(content);   
  // });

  it('Deve buscar todas matches na rota GET /matches ', async () => {
    // Arrange
    sinon
      .stub(Match, "findAll")
      .resolves(outputFindAll as Match[]);

    // Action
    const service = new MatchService();
    const response = await service.findAll();

    // Assertion
    expect(response).to.be.deep.equal(outputFindAll);   
    expect(response.length).to.be.equal(1);   
  });

  // it('Deve buscar um time pelo id ', async () => {
  //   // Arrange
  //   sinon
  //     .stub(Match, "findOne")
  //     .resolves(idMock);

  //   // Action
  //   const service = new TeamService();
  //   const response = await service.findOne(1);

  //   // Assertion
  //   expect(response).to.be.equal(idMock);
  // });
});
