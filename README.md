# Frontend Angular Test 

Este é um projeto de teste para demonstrar conhecimento com o framework Angular. Ele contém todas as especificações solicitadas no documento [Especificação Frontend]("src\assets\Especificação Frontend.pdf"). O projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.11.

## Iniciar

### Pré-requisitos

- Node 18.10.0 ou superior
- NPM 8.19.2 ou superior

### Clone do repositório

```shell
git clone https://github.com/collaco/teste-angular.git
cd teste-angular
```

### Instalar pacotes npm

Instale os pacotes `npm` descritos em `package.json`:

```shell
npm install
```

### Iniciar Aplicação

```shell
npm run start
```

O comando `npm run start` compila o aplicativo Angular e inicia um servidor de desenvolvimento. Ele então fornecerá uma URL local (http://localhost:4200) onde você poderá acessar e testar a aplicação no navegador.

Desligue-o manualmente com `Ctrl-C`.

### Executar Testes Unitários

```shell
npm run test
```

O comando `npm test` executa os testes unitários da aplicação.               
Será gerado um Relatório de cobertura de código (coverage\teste\index.html) para todos os arquivos.
