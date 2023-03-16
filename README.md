# Bem-vindo ao repositório TFC

## Descrição do projeto:

O TFC é um site informativo sobre partidas e classificações de futebol!

Para o projeto foi desenvolvida uma API (utilizando o método TDD) integrada a um banco de dados através do docker-compose e utilizando modelagem de dados através do Sequelize. O desenvolvimento respeitou regras de negócio providas no projeto e a API é capaz de ser consumida por um front-end que foi provido pela Trybe.

Para adicionar e alterar uma partida é necessário ter um token gerado através do JWT, portanto a pessoa deverá estar logada para fazer as alterações.

<details>
  <summary><strong>:busts_in_silhouette: Na aplicação o usuário é capaz de: </strong></summary><br />

- Realizar login
- Listar times
- Listar todas as partidas
- Listar as partidas finalizadas
- Listar as partidas em andamento
- Listar placar geral
- Listar placar considerando apenas times mandantes
- Listar placar considerando apenas times visitantes
- Alterar uma partida em andamento
- Finalizar uma partida em andamento
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
    <summary><strong> GET /login/role </strong></summary><br />
  
  - Para verificar a função/role do usuário que fez login e controlar seus acessos, utilize o método `GET` em `/login/role`.
  - Será verificado o token no parâmetro ` authorization ` no ` header ` da requisição.
  - O retorno será um status `200` e um `json` contendo o *role* do usuário:
        
    ```json
      {
        "role": "admin"
      }
    ```
  </details>


  <details>
  <summary><strong> GET /teams </strong></summary><br />

  - Utilizando o método GET em `/teams`, o retorno será um status `200` e um `json` contendo os times cadastrados:
        
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
  
  - Utilizando o método GET em `/matches`, o retorno será um status `200` e um `json` contendo uma lista de partidas:
        
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


  <details>
  <summary><strong> GET /matches em andamento/finalizadas </strong></summary><br />
  
  - Utilizando o método GET em `/matches` com a `query string` *inProgress*, informe o filtro que deverá ser aplicado.
  - Exemplo: utilizando a rota `/matches?inProgress=true` o retorno será um status `200` e um `json` contendo uma lista de partidas que estão em andamento. Alterando para `/matches?inProgress=false`, o retorno será contido por partidas já finalizadas:
        
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
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      }
    ]
    ```
  
  </details>

  <details>
  <summary><strong> POST /matches </strong></summary><br />
  
  - Utilizando o método POST em `/matches` para adicionar uma nova partida, o body da requisição deve conter os campos ` homeTeamId `, ` awayTeamId `, ` homeTeamGoals ` e ` awayTeamGoals `.
  - Todos os campos devem conter apenas números, os valores de ` homeTeamId ` e ` awayTeamId ` devem ser valores válidos de times existentes no banco de dados, como no exemplo abaixo:

    ```json
      {
        "homeTeamId": 1,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      } 
    ```
  - Não é possível inserir uma partida sem um token válido no parâmetro ` authorization ` no ` header ` da requisição;
  - Caso a partida seja inserida com sucesso, serão retornados os dados da partida e o status ` 201 `:
        
    ```json
      {
        "id": 1,
        "homeTeamId": 1,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
      }
    ```
  
  </details>

  <details>
  <summary><strong> PATCH /matches/:id </strong></summary><br />
  
  - Utilizando o método PATCH em `/matches/:id` é possível atualizar os gols de uma partida **em andamento**, o body da requisição deve conter os campos ` homeTeamGoals ` e ` awayTeamGoals `, por parâmetro, deverá ser fornecido o ` id ` da partida que será atualizada.
  - O ` id ` deve ser um valor válidos de uma partida existente no banco de dados e todos os campos devem conter apenas números, como no exemplo abaixo:

    ```json
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 4
      }
    ```
  - Não é possível atualizar uma partida sem um token válido no parâmetro ` authorization ` no ` header ` da requisição;
  - Caso a partida seja atualizada com sucesso, serão retornados os dados da partida e o status ` 200 `:
        
    ```json
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 3,
        "awayTeamId": 9,
        "awayTeamGoals": 4,
        "inProgress": true,
        "home_team_id": 16,
        "away_team_id": 9,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      }
    ```
  
  </details>

  <details>
  <summary><strong> PATCH /matches/:id/finish </strong></summary><br />
  
  - Utilizando o método PATCH em `/matches/:id/finish` é possível finalizar a partida **em andamento** passada pelo parâmetro ` id ` da URL.
  - O ` id ` deve ser um valor válido de uma partida existente no banco de dados e com status *em andamento*.
  - Não é possível finalizar uma partida sem um token válido no parâmetro ` authorization ` no ` header ` da requisição;
  - Caso a partida seja finalizada com sucesso, será retornada uma mensagem "finished" e o status ` 200 `:
        
    ```json
      {
        "message": "finished"
      }
    ```
  
  </details>

  <details>
  <summary><strong> GET /leaderboard </strong></summary><br />
  
  - Utilizando o método GET em `/leaderboard`, o retorno será um status `200` e um `json` contendo as informações do desempenho de todos os times baseados nas partidas cadastradas:
        
    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": 86.67
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": 80
      },
      {
        "name": "Santos",
        "totalPoints": 11,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 12,
        "goalsOwn": 6,
        "goalsBalance": 6,
        "efficiency": 73.33
      },
      ...
    ]
    ```

  </details>

  <details>
  <summary><strong> GET /leaderboard/home </strong></summary><br />
  
  - Utilizando o método GET em `/leaderboard/home`, o retorno será um status `200` e um `json` contendo as informações do desempenho dos times da casa baseados nas partidas cadastradas:
        
    ```json
    [
      {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 6,
        "goalsOwn": 1,
      },
      {
        "name": "Santos",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 9,
        "goalsOwn": 3,
      },
      {
        "name": "Palmeiras",
        "totalPoints": 7,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 10,
        "goalsOwn": 5,
      },
      ...
    ]
    ```

  </details>

  <details>
  <summary><strong> GET /leaderboard/away </strong></summary><br />
  
  - Utilizando o método GET em `/leaderboard/away`, o retorno será um status `200` e um `json` contendo as informações do desempenho dos times visitantes baseados nas partidas cadastradas:
        
    ```json
    [
      {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 6,
        "goalsOwn": 2,
      },
      {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
      },
      {
        "name": "Internacional",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 3,
        "goalsOwn": 0,
      },
      ...
    ]
    ```

  </details>