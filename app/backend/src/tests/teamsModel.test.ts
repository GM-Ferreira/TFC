import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import Team from '../database/models/TeamsModel';
import TeamService from '../api/services/TeamService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota Teams', () => {
    const outputMock: Team[] = [new Team({
    id: 1,
    teamName: 'Nome do time',
  })];

  const idMock: Team = new Team({
    id: 1,
    teamName: 'Nome do time',
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Deve testar a rota inicial / com sucesso', async () => {
    // Arrange
    const content = {
      ok: true,
    }
    // Action
    const response = await chai.request(app).get('/');

    // Assertion
    expect(response.status).to.be.equal(200);   
    expect(response.body).to.be.deep.equal(content);   
  });

  it('Deve buscar todos times na rota teams ', async () => {
    // Arrange
    sinon
      .stub(Team, "findAll")
      .resolves(outputMock as Team[]);

    // Action
    const service = new TeamService();
    const response = await service.findAll();

    // Assertion
    expect(response).to.be.deep.equal(outputMock);   
    expect(response.length).to.be.equal(1);   
  });

  it('Deve buscar um time pelo id ', async () => {
    // Arrange
    sinon
      .stub(Team, "findOne")
      .resolves(idMock);

    // Action
    const service = new TeamService();
    const response = await service.findOne(1);

    // Assertion
    expect(response).to.be.equal(idMock);
  });
});
