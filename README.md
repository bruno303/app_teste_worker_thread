# app_teste_worker_thread
Testes para execução de processamentos em CPU em um pool de worker threads com nodejs.

## Introdução

Passo a passo para rodar a aplicação:

### Pré-requisitos

* [NodeJs](https://nodejs.org/en/)
* [Npm](https://www.npmjs.com/)
* [Nodemon](https://nodemon.io/)

### Instalação

* Clone o projeto para um diretório da sua máquina local.
* Use o comando do Npm para baixar as dependências do projeto.
```
npm install
```

* Instale o nodemon para rodar o projeto.
```
npm i nodemon -g
```

* Para executar a aplicação, execute o script npm start

```
npm start
```

* Utilize as rotas para a realização dos testes de bloqueio da thread principal

```
http://127.0.0.1:3000/syncsum/100000000
http://127.0.0.1:3000/asyncsum/100

http://127.0.0.1:3000/syncfibo/100000000
http://127.0.0.1:3000/asyncfibo/100

http://127.0.0.1:3000/syncmultip/100000000/100000000
http://127.0.0.1:3000/asyncmultip/100/15
```

* Utilize outros valores para simular operações mais leves ou pesadas.

## Autores

* **Bruno Oliveira** - [bruno303](https://github.com/bruno303)

## Licença

O projeto está licenciado sobre a Licença MIT - veja o arquivo [LICENSE](https://github.com/bruno303/app_teste_worker_thread/blob/master/LICENSE) para mais detalhes