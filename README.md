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
- MySQL;
- Sequelize ORM;
- JOI data validator;
- JSON Web Token (JWT);
</details>

<details>
  <summary><strong>:twisted_rightwards_arrows: Funcionamento </strong></summary><br />
  
 <details>
  <summary><strong>:whale: Execução da aplicação </strong></summary><br />
  
  - Para iniciar o projeto basta ter o docker instalado e rodar o comando ```npm run compose:up``` na pasta raiz do repositório.
  - Para finalizar o projeto rode o comando ```npm run compose:down``` na pasta raiz do repositório.
  </details>

 <details>
  <summary><strong>Rotas </strong></summary><br />
  
  - GET ...
  - GET ...
  - GET ...
  - GET ...
  </details>
</details>
