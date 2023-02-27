import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import Team from '../database/models/TeamsModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota Teams', () => {
  let chaiHttpResponse: Response;
  const outputMock: Team[] = [new Team({
    id: 1,
    teamName: 'Nome do time',
  })];

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(outputMock as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
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
    // Arrange no before
    // Action
    const response = await chai.request(app).get('/teams');

    // Assertion
    expect(response.status).to.be.equal(200);   
    expect(response.body).to.be.deep.equal(outputMock);   
  });
});
