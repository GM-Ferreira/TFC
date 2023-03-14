# Bem vindo ao repositório TFC

## Descrição do projeto:

O TFC é um site informativo sobre partidas e classificações de futebol!

Para o projeto foi desenvolvida uma API (utilizando o método TDD) integrada a um banco de dados através do docker-compose e utilizando modelagem de dados através do Sequelize. O desenvolvimento respeitou regras de negócio providas no projeto e a API é capaz de ser consumida por um front-end que foi provido pela Trybe.

Para adicionar e alterar uma partida é necessário ter um token gerado atráves do JWT, portanto a pessoa deverá estar logada para fazer as alterações.

<details>
  <summary><strong>:busts_in_silhouette: Na aplicação o usuário é capaz de: </strong></summary><br />

- Realizar login
- Listar times
- Listar todas as partidas
- Listar as partidas finalizadas
- Listar as partidas em andamento
- Listar placar geral
- Listar placar considerando apenas times mandantes
- Listar placar considerando apenas times vizitantes
- Alterar uma partida em andamento
- Finalziar uma partida em andamento
</details>

<details>
  <summary><strong> :hammer_and_wrench: Habilidades utilizadas no desenvolvimento</strong></summary><br />
  
- Modelagem de dados com MySQL através do Sequelize;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma API REST com endpoints para consumir os models criados;
- Construção de um CRUD com TypeScript utilizando ORM;
- Práticas dos conhecimentos sobre os princípios SOLID;
- Práticas dos pilares da Programação Orientada a Objetos: Herança, Abstração, Encapsulamento e Polimorfismo;
</details>

<details>
  <summary><strong>:pencil: Stacks praticadas durante o desenvolvimento</strong></summary><br />
  
- Node.js
- TypeScript
- Express.js
- Docker
- MySQL
- Sequelize ORM
- JOI data validator
- JSON Web Token (JWT)
</details>

 ##  Funcionamento
  
 <details>
  <summary><strong>:whale: Execução da aplicação </strong></summary><br />
  
  - Para iniciar o projeto basta ter o docker instalado e rodar o comando ```npm run compose:up``` na pasta raiz do repositório.
  - Para finalizar o projeto rode o comando `npm run compose:down` na pasta raiz do repositório.
  - Para visualizar os logs do backend no terminal, rode o comando `npm run logs backend` na pasta raiz do repositório.
  - O backend roda na porta ` 3001 ` e o frontend na porta ` 3000 `
  - Caso queira acessar o banco de dados MySQL pelo seu computador, conecte-se a porta ` 3002 ` com user ` root ` e password ` 123456 `
  </details>

 <details>
  <summary><strong>:twisted_rightwards_arrows: Rotas </strong></summary><br />
  
  <details>
    <summary><strong> POST /login </strong></summary><br />
  
  - Para realizar o login, utilize o método `POST` em `/login`, o body da requisição deve conter o seguinte formato:

    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - O campo `email` deve receber um email válido. Ex: `tfc@projeto.com`;
  - O campo `password` deve ter mais de 6 caracteres.
  - Além de válidos, é necessário que o email e a senha estejam cadastrados no banco para ser feito o login;
  - O retorno será um status `200` e um `json` contendo o token de acesso:
        
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc4Nzk2MTA5fQ.dxoDS5N05_1nmtnrcbHtC0yY75dohq9d5r-mREh8X-E"
    }
    ```
  - Para testar a aplicação utilize os válidos campos abaixo no login:

    ```json
    {
      "email": "admin@admin.com",
      "password": "secret_admin"
    }
    ```
  </details>

  <details>
  <summary><strong> GET /teams </strong></summary><br />

  - Utilizando o método GET em /teams, o retorno será um status `200` e um `json` contendo os times cadastrados:
        
    ```json
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      ...
    ]
    ```

  </details>
  
  <details>
  <summary><strong> GET /matches </strong></summary><br />
  
  - Utilizando o método GET em /matches, o retorno será um status `200` e um `json` contendo uma lista de partidas:
        
    ```json
    [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      }
    ]
    ```
  
  </details>
