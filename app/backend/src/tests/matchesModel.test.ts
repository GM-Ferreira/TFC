import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Match from '../database/models/MatchModel';
import IMatch from '../api/interfaces/IMatch';
import { Model } from 'sequelize';
import MatchService from '../api/services/MatchService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /matches', () => {
  const app = new App();

  const inputMock = {
    homeTeamGoals: 3,
    awayTeamGoals: 7,
  };
  
  const newMatch = {
    id: 49,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
    inProgress: true
  } as Match;

  const outputGoalsChanged = {
    id: 43,
    homeTeamId: 11,
    homeTeamGoals: 3,
    awayTeamId: 10,
    awayTeamGoals: 7,
    inProgress: true,
    home_team_id: 11,
    away_team_id: 10,
    homeTeam: {
      teamName: "Napoli-SC"
    },
    awayTeam: {
      teamName: "Minas Brasília"
    }
  }

  const outputMock: Match = {
    id: 1,
    homeTeamId:  1,
    awayTeamId: 2,
    homeTeamGoals: 3,
    awayTeamGoals: 0,
    inProgress: true
  } as Match;

  const outputMock1: Match = {
    id: 2,
    homeTeamId:  9,
    awayTeamId: 3,
    homeTeamGoals: 1,
    awayTeamGoals: 1,
    inProgress: true
  } as Match;

  const outputMock2: Match = {
    id: 3,
    homeTeamId:  7,
    awayTeamId: 5,
    homeTeamGoals: 7,
    awayTeamGoals: 1,
    inProgress: true
  } as Match;

  const outputArray: Match[] = [outputMock, outputMock1, outputMock2]

  afterEach(()=>{
    sinon.restore();
  })

  it('É possível listar todas partidas na rota GET /matches - http req', async () => {
    // Arrange
    sinon.stub(Model, "findAll").resolves([outputMock]);

    // Action
    const response = await chai.request(app.app).get('/matches');

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body[0]).to.be.deep.equal(outputMock);
  });

  it('É possível listar partidas em andamento na rota GET /matches - http req', async () => {
    // Arrange
    sinon.stub(Model, "findAll").resolves(outputArray);

    // Action
    const response = await chai.request(app.app).get('/matches?inProgress=true');

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body[0]).to.be.deep.equal(outputMock);
  });

  it('Retorno um erro se não encontrar partidas rota GET /matches - http req', async () => {
    // Arrange
    const error = new Error("match not found");
    sinon.stub(Model, "findAll").throws(error)

    // Action
    const response = await chai.request(app.app).get('/matches?inProgress=true');

    // Assertion
    expect(response.status).to.be.equal(500);
  });

  it('É possível finalizar partidas em andamento na rota PATCH /matches/:id/finish - http req', async () => {
    // Arrange
    const affectedCount = 1;
    sinon.stub(Model, "update").resolves([affectedCount]);

    // Action
    const response = await chai.request(app.app)
    .patch('/matches/41/finish')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');;

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({message: "finished"});
  });

  it('Retorna not found se não encontrar o id na rota PATCH /matches/:id/finish - http req', async () => {
    // Arrange
    const affectedCount = 0;
    sinon.stub(Model, "update").resolves([affectedCount]);

    // Action
    const response = await chai.request(app.app)
    .patch('/matches/99/finish')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');;

    // Assertion
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({message: "match not found or alredy finished"});
  });

  it('É possível atualizar os gols de partidas em andamento na rota PATCH /matches/:id - http req', async () => {
    // Arrange
    // sinon.stub(Model, "findAll").resolves(outputArray);
    // sinon.stub(Model, "save").resolves(outputGoalsChanged);
    // how to mock and test save method sequelize ?

    // Action
    const response = await chai.request(app.app)
    .patch('/matches/43')
    .send(inputMock)
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c')

    // Assertion
    expect(response.status).to.be.equal(200);
  });

  it('Retorna um erro ao atualizar partida finalizada na rota PATCH /matches/:id - http req', async () => {
    // Arrange
    const service = new MatchService();
    const error = new Error('Match already finished');
    sinon.stub(service, "updateGoals").throws(error)


    // Action
    const response = await chai.request(app.app)
    .patch('/matches/1')
    .send(inputMock)
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c')

    // Assertion
    expect(response.status).to.be.equal(500);
  });

  it('É possível criar uma partida na rota POST /matches - http req', async () => {
    // Arrange
    sinon.stub(Model, "create").resolves(newMatch);
    const bodyToNewMatch = {
      homeTeamId: 1,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    }

    // Action
    const response = await chai.request(app.app)
      .post('/matches?inProgress=true')
      .send(bodyToNewMatch)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');

    // Assertion
    expect(response.status).to.be.equal(201);
  });

  it('Não é possível criar uma partida com ids iguais POST /matches - http req', async () => {
    // Arrange
    const bodyToNewMatch = {
      homeTeamId: 1,
      awayTeamId: 1,
      homeTeamGoals: 0,
      awayTeamGoals: 2
    }

    // Action
    const response = await chai.request(app.app)
      .post('/matches?inProgress=true')
      .send(bodyToNewMatch)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');

    // Assertion
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({
      message: 'It is not possible to create a match with two equal teams' });
  });

  it('Não é possível criar uma partida com ids inexistentes POST /matches - http req', async () => {
    // Arrange
    const bodyToNewMatch = {
      homeTeamId: 998,
      awayTeamId: 999,
      homeTeamGoals: 0,
      awayTeamGoals: 2
    }

    // Action
    const response = await chai.request(app.app)
      .post('/matches?inProgress=true')
      .send(bodyToNewMatch)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');

    // Assertion
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });
});
