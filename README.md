[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png 'MOZG'

![valid XHTML][checkmark]

# nestjs-standard-api

29092021-172136

- https://nestjs.com/

- https://docs.nestjs.com/

```console
$ nest --help
$ nest new nestjs-standard-api

$ yarn add @nestjs/config @nestjs/swagger swagger-ui-express class-validator class-transformer cielo

$ nest g resource orders

```

- https://courses.nestjs.com/
- https://github.com/nestjs/nest/tree/master/sample

## Regras

👾️⚙️

1 - Os pagamentos serão feitos apenas com cartão de DÉBITO, utilizando o ambiente sandbox da
Cielo.

Essa regra é necessária para avaliarmos como o candidato lida com uma comunicação bi-
direcional entre APIs REST, uma vez que a cielo exige uma autenticação extra nessa modalidade e
envia uma requisição POST de volta para uma url que será fornecida como endpoint de notificações
de pagamento da cielo.

[✅️] Implementado a transação

[✅️] Implementado a Url de retorno e armazenando em fila

2 – Cada pagamento capturado (finalizado) deverá ter seu valor adicionado à carteira do vendedor.

ℹ️ @TODO: Devo implementar tratamento na Url de retorno, processo para consulta do parâmetro "PaymentId", onde caso o retorno tenha o status como 2 equivale que a transação deve ser autorizada "paga"

3 – Cada valor que for adicionado à carteira do vendedor, deverá gerar um registro de transação,
contendo o valor adicionado e o pagamento de origem.

ℹ️ @TODO:

4 – TODAS AS REQUISIÇÕES feitas para a API e ENVIADAS pela API, deverão ser LOGADAS.
Para isso, crie um modulo na api para fazer envio de dados para uma fila no RabbitMQ. Os dados
que deverão ser enviados para essa fila a cada requisição são headers, body, url, metodo (get, post,
etc..) e um timestamp do evento. Faça um DTO com esses campos e um método para envio à fila.
Esse modulo deverá ser injetado em todos os modulos que receberem ou enviarem requisições e
deverá ser invocado nesses momentos.

✅️ Feito

7 – Documente seus endpoints com Swagger e deixe a interface no endpoint /docs

✅️ Feito

8 – Cuidado com a autenticação. Um usuário não pode acessar os endpoints do outro tipo de
usuário. Utilize autenticação Bearer token JWT.

ℹ️ @TODO:

✅️ ℹ️ 🛑️

👾️⚙️

## Contribuição

Caso queira contribuir para melhoria da documentação de um Fork no repositório e envie um pull request ou edite no github

## Requerimentos

- https://www.docker.com/
- https://code.visualstudio.com/
- https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack

## Executando local

```console

git clone ☝️

cd <directory>

code --new-window .

```

## Executando no container

- Utilize o container do Visual Studio Code

# Nest

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
