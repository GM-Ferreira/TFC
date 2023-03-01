import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import { app } from '../app';


import User from '../database/models/UserModel'
import UserService from '../api/services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota Login', () => {
  const outputUser: User = new User({
    "id": 1,
    "username": "Admin",
    "role": "admin",
    "email": "admin@admin.com",
    "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  });

  const inputLogin = {
    "email": "admin@admin.com",
    "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  };

  const inputWrongLogin = {
    "email": "admin",
    "password": "1234"
  };

  const inputNoEmail = {
    "email": "",
    "password": "1234"
  };

  const inputNoPassword = {
    "email": "email@teste.com",
    "password": ""
  };

  const outErrorMsg = {message: "Invalid email or password"}
  const outErrorFields = {message: "All fields must be filled"}

  afterEach(()=>{
    sinon.restore();
  })

  it('É possível listar todos usuários', async () => {
    // Arrange
    sinon.stub(User, "findAll").resolves([outputUser]);

    // Action
    const service = new UserService();
    const response = await service.findAll();

    // Assertion
    expect(response[0]).to.be.deep.equal(outputUser);
  });

  it('Deve ser possível fazer login', async () => {
    // Arrange
    sinon.stub(User, "findOne").resolves(outputUser);
    sinon.stub(bcrypt, 'compareSync').resolves(true)

    // Action
    const service = new UserService();
    const response = await service.findOne(inputLogin.email, inputLogin.password);

    // Assertion
    expect(response).have.property('token').and.to.be.a('string');
  });

  it('Não deve ser possível fazer login com dados inválidos', async () => {
    // Arrange
    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(bcrypt, 'compareSync').resolves(false)

    // Action
    const response = await chai.request(app).post('/login').send(inputWrongLogin);

    // Assertion
    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal(outErrorMsg)
  });

  it('Não deve ser possível fazer login sem email', async () => {
    // Arrange
    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(bcrypt, 'compareSync').resolves(false)

    // Action
    const response = await chai.request(app).post('/login').send(inputNoEmail);

    // Assertion
    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal(outErrorFields)
  });

  it('Não deve ser possível fazer login sem password', async () => {
    // Arrange
    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(bcrypt, 'compareSync').resolves(false)

    // Action
    const response = await chai.request(app).post('/login').send(inputNoPassword);

    // Assertion
    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal(outErrorFields)
  });

  // it('Não deve ser possível fazer login com dados inválidos', async () => {
    // Arrange
    // sinon.stub(User, "findOne").resolves(outputUser);
    // sinon.stub(bcrypt, 'compareSync').resolves(null)

    // Action
    // const service = new UserService();
    // const response = await service.findOne(inputWrongLogin.email, inputWrongLogin.password);

    // Assertion
    // expect(service.findOne).to.throw('Invalid user or password');
    // expect(response).to.throw('Invalid user or password');

  // });
});
