import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import { app } from '../app';

import User from '../database/models/UserModel'
import UserService from '../api/services/UserService';
import { exec } from 'child_process';
// import  IUser from '../api/interfaces/IUser'

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

  it('É possível listar todos usuários - service', async () => {
    // Arrange
    sinon.stub(User, "findAll").resolves([outputUser]);

    // Action
    const service = new UserService();
    const response = await service.findAll();

    // Assertion
    expect(response[0]).to.be.deep.equal(outputUser);
  });

  it('É possível listar todos usuários - http req', async () => {
     // Arrange
     sinon.stub(User, "findAll").resolves([outputUser]);
 
     // Action
     const response = await chai.request(app).get('/login');
 
     // Assertion
     expect(response.status).to.be.equal(200);
  });

  it('Retorna um erro se não encontrar usuarios - http req', async () => {
    // Arrange
    const error = new Error("user not found");
    sinon.stub(User, "findAll").throws(error);

    // Action
    const response = await chai.request(app).get('/login');

    // Assertion
    expect(response.status).to.be.equal(500);
  });

  it('É possível buscar usuário pelo token - http req', async () => {
  // Arrange
  sinon.stub(User, "findOne").resolves(outputUser);

  // Action
  const response = await chai.request(app)
  .get('/login/role')
  .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');
  
  //Assertion
  expect(response).to.have.status(200);
  expect(response.body).to.be.deep.equal({role: 'admin'});

  });

  it('Retorna um erro ao buscar usuário com token invalido - http req', async () => {
    // Arrange
    const invalidToken = 'eyJh'

    // Action
    const response = await chai.request(app)
    .get('/login/role')
    .set('authorization', invalidToken);

    //Assertion
    expect(response).to.have.status(401);
  });

  it('Retorna um erro ao buscar usuário sem token - http req', async () => {
    // Arrange
    const invalidToken = 'eyJh'

    // Action
    const response = await chai.request(app)
    .get('/login/role')
    .set('wrongName', invalidToken);

    //Assertion
    expect(response).to.have.status(401);
  });

  it('Erro token valido porém usuário não existe no middleware - http req', async () => {
    // Arrange
    sinon.stub(User, "findOne").resolves(null);
  
    // Action
    const response = await chai.request(app)
    .get('/login/role')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');
    
    //Assertion
    expect(response).to.have.status(400);
  });
  
  it('Erro token valido porém usuário não existe no service - http req', async () => {
    // Arrange
    sinon.stub(User, "findOne")
      .onCall(0).resolves(outputUser)
      .onCall(1).resolves(null);

    // Action
    const response = await chai.request(app)
    .get('/login/role')
    .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3ODQ3OTc1fQ.1OGw-6ihzGxfLR1PXCz8Jggp403YzwJH-sWNXveC39c');
    
    //Assertion
    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});

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

  it('É possível fazer login com dados válidos - http req', async () => {
    // Arrange
    sinon.stub(User, "findOne").resolves(outputUser);
  
    // Action
    const response = await chai.request(app)
    .post('/login')
    .send({ email: "admin@admin.com", password: "secret_admin" })
    
    //Assertion
    expect(response).to.have.status(200); 
  });

  it('Erro de usuário não existente na service - http req', async () => {
    // Arrange
    sinon.stub(User, "findOne").resolves(null);
  
    // Action
    const response = await chai.request(app)
    .post('/login')
    .send({ email: "admin@admin.com", password: "secret_admin" })
    
    //Assertion
    expect(response).to.have.status(401); 
    expect(response.body).to.deep.equal(outErrorMsg)
  });
});
