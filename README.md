# Projeto de Automação Cypress

Este repositório contém testes automatizados para API e UI utilizando Cypress.

## Pré-requisitos

Antes de rodar os testes, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão recomendada 16 ou superior)  
- Cypress (será instalado via npm)

## Estrutura do Projeto

- `cypress/e2e/api/` — testes automatizados da API (ex: Swagger API).  
- `cypress/e2e/ui/` — testes automatizados da interface web.  
- `cypress/fixtures/` — arquivos de dados para os testes.  
- `cypress/support/` — comandos customizados e page objects.

## Como rodar

1. Clone o repositório:  
`git clone <url-do-repositorio>`  
`cd <nome-do-repositorio>`

2. Instale as dependências (incluindo o Cypress):  
`npm install`  
`npm install cypress --save-dev`

3. Execute os testes:  
- Para rodar todos os testes no modo headless:  
`npx cypress run`  

- Para abrir a interface interativa do Cypress:  
`npx cypress open`

## Como usar o Cypress

- No modo interativo (`npx cypress open`), selecione o teste que deseja executar.  
- Os testes irão rodar no navegador e você verá os resultados em tempo real.  
- No modo headless (`npx cypress run`), os testes rodam no background e os resultados aparecem no terminal.

## Sobre

Testes escritos em JavaScript usando Cypress para garantir qualidade de APIs e UI. Projeto pessoal para prática e evolução em automação.
