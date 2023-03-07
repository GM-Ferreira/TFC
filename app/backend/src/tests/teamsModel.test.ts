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

  it('É possível listar todos os times - http req', async () => {
    // Arrange
    sinon.stub(Team, "findAll").resolves(outputMock);

    // Action
    const response = await chai.request(app).get('/teams');

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.lengthOf(1);
  });

  it('Retorna um erro se não encontrar times - http req', async () => {
  // Arrange
  const error = new Error("user not found");
  sinon.stub(Team, "findAll").throws(error);

  // Action
  const response = await chai.request(app).get('/teams');

  // Assertion
  expect(response.status).to.be.equal(500);
  });

  it('Deve buscar um time pelo id - http req', async () => {
    // Arrange
    sinon.stub(Team, "findOne").resolves(idMock);

    // Action
    const response = await chai.request(app).get('/teams/1');

    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('id', 1);
    expect(response.body).to.have.property('teamName', 'Nome do time');
  });

  it('Retorna um erro se não encontrar um time pelo id - http req', async () => {
    // Arrange
    const error = new Error("team not found");
    sinon.stub(Team, "findOne").throws(error);
  
    // Action
    const response = await chai.request(app).get('/teams/999');
  
    // Assertion
    expect(response.status).to.be.equal(500);
  });

  it('Retorna um erro se busca pelo id for vazia - http req', async () => {
    // Arrange
    sinon.stub(Team, "findOne").resolves(null);
  
    // Action
    const response = await chai.request(app).get('/teams/000');
  
    // Assertion
    expect(response.status).to.be.equal(500);
  });
});
