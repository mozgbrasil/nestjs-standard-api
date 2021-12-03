[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/logo_32_32.png 'MOZG'

![valid XHTML][checkmark]'''

# nestjs-standard-api 👉️

- https://nestjs.com/

- https://docs.nestjs.com/

```console
$ nest --help
$ nest new nestjs-standard-api

$ yarn add crypt @types/bcrypt amqplib amqp-connection-manager @nestjs/microservices amqplib joi @nestjs/jwt passport-jwt @nestjs/passport passport passport-local @nestjs/config @nestjs/swagger swagger-ui-express class-validator class-transformer cielo

$ yarn add @types/joi @types/passport-local @types/passport-jwt -D

$ nest g resource auth
$ nest g resource cats
$ nest g resource users
$ nest g resource sellers
$ nest g resource payments
$ nest g resource wallets
$ nest g resource transactions

```

- https://courses.nestjs.com/
- https://github.com/nestjs/nest/tree/master/sample

# Implementações

👇️

- Implementado CRUD Cats utilizando "Services" para armazenamento em Matriz
- Implementado Swagger com ApiProperty
- Implementado Middleware
- Implementado Exception
- Implementado Pipes Validator
- Implementado Authentication Guards
- Implementado Interceptors
- Implementado CRUD Users
- Implementado Authentication
- Implementar Authorization
- Implementado Cors
- Implementado C.I. com suporte a testes automatizados e implantação Heroku

* Tests via Swagger

- http://localhost:3004/api/#/default/AppController_getHello

- http://localhost:3004/api/#/cats/CatsController_findAll
- http://localhost:3004/api/#/cats/CatsController_create
- http://localhost:3004/api/#/cats/CatsController_findAll

- http://localhost:3004/api/#/default/UsersController_login_local

> Request Parameters

    {"username": "john", "password": "changeme"}

- http://localhost:3004/api/#/default/UsersController_login_jwt

> Request Parameters

    {"username": "john", "password": "changeme"}

> Response body

    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTYzMjc0NzA1MiwiZXhwIjoxNjMyNzQ3MTEyfQ.nsnfZOuxb7kTPDvAVKeMSQWyLjZfdIGlEEQHnJkMNQI"
    }

- http://localhost:3004/api/#/users/UsersController_getProfile

> Response body

    Download
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }

```console
$ curl -X POST http://localhost:3004/auth/login/jwt -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"

$ curl http://localhost:3004/profile -H "Authorization: Bearer ???"
```

👇️

@TODO: CI - Test = Not Work, Arquivo renomeado com extensão "-DISABLED"

```console
$ find . -name "*.*-DISABLED" -type f
./src/app.controller.spec.ts-DISABLED
./src/auth/auth.service.spec.ts-DISABLED
```

👇️

- Implementado integração junto a Cielo no endpoint /orders de transação está funcional via API

- Implementado RabbitMQ usando client nativo e "APP_INTERCEPTOR"

👇️

## Regras

👾️⚙️

1 - Os pagamentos serão feitos apenas com cartão de DÉBITO, utilizando o ambiente sandbox da
Cielo.

Essa regra é necessária para avaliarmos como o candidato lida com uma comunicação bi-
direcional entre APIs REST, uma vez que a cielo exige uma autenticação extra nessa modalidade e
envia uma requisição POST de volta para uma url que será fornecida como endpoint de notificações
de pagamento da cielo.

👕️ Implementado a transação

👕️ Implementado a Url de retorno e armazenando em fila

2 – Cada pagamento capturado (finalizado) deverá ter seu valor adicionado à carteira do vendedor.

👕️ Feito

3 – Cada valor que for adicionado à carteira do vendedor, deverá gerar um registro de transação,
contendo o valor adicionado e o pagamento de origem.

👕️ Feito

4 – TODAS AS REQUISIÇÕES feitas para a API e ENVIADAS pela API, deverão ser LOGADAS.
Para isso, crie um modulo na api para fazer envio de dados para uma fila no RabbitMQ. Os dados
que deverão ser enviados para essa fila a cada requisição são headers, body, url, metodo (get, post,
etc..) e um timestamp do evento. Faça um DTO com esses campos e um método para envio à fila.
Esse modulo deverá ser injetado em todos os modulos que receberem ou enviarem requisições e
deverá ser invocado nesses momentos.

👕️ Feito o envio para a fila no RabbitMQ de todas as requisições

7 – Documente seus endpoints com Swagger e deixe a interface no endpoint /docs

👕️ Feito

- https://nestjs-standard-api.herokuapp.com/docs/

8 – Cuidado com a autenticação. Um usuário não pode acessar os endpoints do outro tipo de
usuário. Utilize autenticação Bearer token JWT.

👕️ Feito

👾️⚙️

## Melhorias

Sobre os itens para alinhamento enviada pelo Discord

### API

1. Padrões REST

A api deve ter o formato rest, nesse formato, uma resposta em texto puro não é apropriada. uma api rest padrão deve responder somente json (application/json)

> > basta ajustar as responses para não retornar uma string, e sim um objeto, como por exemplo return { message: "mensagem aqui" } em vez de algo como return "mensagem aqui", o nest já detectará o objeto e mudará a resposta para application/json sem nenhum ajuste ser necessário.

👕️ Detectei somente no controller inicial o retorno como string, os demais controller é enviado no formato json

Feito a Correção

https://nestjs-standard-api.herokuapp.com/

2. docker-compose

Não encontrei seu arquivo docker-compose, que deveria levantar o servidor do rabbitmq e dos seus bancos de dados localmente. A api deve poder rodar totalmente local, integrando-se aos serviços necessários via docker.

> > criar arquivo docker-compose com sua infra e configurar a api, via variaveis de ambiente, para conectar-se com esses serviços localmente

👕️ feito `docker-compose up dev`

3. Orientação a objeto nas classes de serviço

Notei varias funções declaradas DENTRO das classes de serviço. O Nestjs usa a orientação a objeto clássica em suas classes, o que significa que, dentro das classes, devemos implementar somente MÉTODOS. Funções nesse contexto não é uma boa prática e ferem os conceitos de S.O.L.I.D e do Clean Code. Observe que a orientação a objetos é obrigatória somente nas classes, você ainda pode criar e exportar funções sem problemas, mas essas funções devem estar fora da classe, jamais dentro. você pode chamar essas funções externas de dentro dos métodos da sua classe se achar apropriado, apenas não crie essas funções de dentro da classe.

Ex: A função cieloDebitCard() deveria estar sendo exportada de outro arquivo e ser apenas chamada na classe dentro de algum método. Outra alternativa seria transformar essa função em um método privado da própria classe.

> > refatorar as classes de serviço para não implementarem funções, substitua por métodos e utilize o construtor da classe sempre que achar necessário incializar alguma propriedade ou fluxo da classe em sua inicialização.

👕️ Feito

4. Métodos não implementados.

podemos ver que os métodos principais ainda não estão implementados, estão retornando apenas uma string pura diretamente (vide o item 1).
A função cieloDebitCard(), com as devidas considerações do item 3, parece ok, mas tente deixa-la mais dinamica, passando como argumento o ID do pagamento/pedido e referenciando esse id no campo merchantOrderId, para que assim possamos ter uma rastreabilidade melhor dos pagamentos na cielo.

👕️ Feito

5. DTOs não documentados

Os DTOs das requisições não estão documentados no swagger.

👕️ feito

6. Multiplas conexões com o RabbitMQ

O guard que envia as requisições ao rabbitmq está instanciando uma nova conexão a cada chamada que chega à api.

> > refatore a conexão ao rabbit criando um modulo que cria uma unica conexão ao rabbitmq e exporta o canal de transmissao como um singleton único também, de maneira que essa conexão e esse canal sejam instanciados apenas uma única vez e sua conexão seja reaproveitada em todas as chamadas.

ℹ️ @TODO:

Baseado em

https://stackoverflow.com/questions/66476115/rabbitmq-in-nestjs-error-on-both-producer-and-consumer

7. Requisição à cielo não está sendo enviada para a fila de logs do rabbitmq.

Na função de envio do pagamento à cielo, não vi nenhum ponto do código que envia o log dessa requisição à fila dos logs.

👕️

8. Autenticação
   Não vi nenhum mecanismo de auteticação implementado.

👕️ feito

### MICRO-SERVIÇO

1. Lógica no controller

vi muita lógica de negócio dentro do controller, o que fere o principio da responsabilidade única do S.O.L.I.D. O controller deve lidar apenas com os aspectos da requisição ou evento que chegam, enquanto o processamento de negócio desses dados devem ser feitos pelo service.

👕️ feito

2. Códigos desnecessários

O microserviço deve fazer apenas 2 coisas: ouvir as requisições que chegam na fila e salvar essas requisições no banco. ( e pelo que vi, ele já está fazendo isso )
No controller do microservice existe uma quantidade grande de código desnecessário, ferindo o clean code. elimine os códigos desnecessários do microserviço, deixando somente o que é necessário para que ele cumpra seus objetivos e nada a mais.

👕️ feito

RESUMO:

- A api tem uma função de envio de pagamento à cielo mas ainda não tem essa funcionalidade implementada para o usuário criar o pagamento

👕️ feito

- nenhum dos casos de uso contidos no diagrama de casos de uso do teste está implementado

- nenhuma autenticação foi implementada

👕️ feito

- falta docker-compose para testar o projeto

👕️ feito

- os logs aparentemente estão sendo salvos, mas somente os que são recebidos pela api. falta logar as requisições que são feitas pela pópria api (cielo)

👕️ feito

- varias quebras dos principios S.O.L.I.D (principalmente o primeiro e o quinto) e do Clean Code. (lógicas de serviço dentro do controller no microserviço, códigos altamente acoplados, definição de funções dentro de classes, método construtor não utilizado)

👕️ feito

- o microserviço está praticamente pronto, agora falta somente os ajustes citados.

👕️ feito

INSTRUÇÕES

- Ler um pouco mais sobre S.O.L.I.D e clean code (prioridade).

👕️ ℹ️ @TODO: Vendo videos que abordam essas práticas

- mover a lógica do controller para dentro do service no microserviço e eliminar códigos desnecessários

👕️ feito

- implemente os casos de uso do teste, considerando a autenticação

👕️ feito via swagger

- proceda com os ajustes citados na conexão do rabbit na api

ℹ️ @TODO:

- implemente o envio do log da requisição da cielo para a fila

👕️ Feito

### Passos Test Swagger

- Create User
- Create Seller
- Auth User
  |-- Authorize
- User Payment
  |-- > authenticationUrl
- Check Payment

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

## Links

- https://www.youtube.com/watch?v=u3qGnyPy-pk&t=80s

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
