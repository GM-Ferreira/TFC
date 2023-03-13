import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { Model } from 'sequelize';
import { finishedMatches, leaderboard, leaderboardAway, leaderboardHome, teams } from './mocks/leaderboradMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /leaderboard', () => {
  const app = new App();

  afterEach(()=>{
    sinon.restore();
  })

  it('É possível listar todas partidas na rota GET /leaderboard - http req', async () => {
    // Arrange
    sinon.stub(Model, "findAll")
    .onCall(0).resolves(teams)
    .onCall(1).resolves(finishedMatches);

    // Action
    const response = await chai.request(app.app).get('/leaderboard');

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboard);
  });

  it('É possível listar todas partidas na rota GET /leaderboard/home - http req', async () => {
    // Arrange
    sinon.stub(Model, "findAll")
    .onCall(0).resolves(teams)
    .onCall(1).resolves(finishedMatches);

    // Action
    const response = await chai.request(app.app).get('/leaderboard/home');

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboardHome);
  });

  it('É possível listar todas partidas na rota GET /leaderboard/away - http req', async () => {
    // Arrange
    sinon.stub(Model, "findAll")
    .onCall(0).resolves(teams)
    .onCall(1).resolves(finishedMatches);

    // Action
    const response = await chai.request(app.app).get('/leaderboard/away');

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboardAway);
  });
});
