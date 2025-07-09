/**
 * Comando para realizar login
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="senha"]').type(password);
  cy.get('[data-testid="entrar"]').click();
});

/**
 * Comando para realizar cadastro
 * @param {Object} userData - Dados do usuário
 */
Cypress.Commands.add('registerUser', (userData) => {
  cy.visit('/login');
  cy.get('[data-testid="cadastrar"]').click();
  cy.get('[data-testid="nome"]').type(userData.nome);
  cy.get('[data-testid="email"]').type(userData.email);
  cy.get('[data-testid="password"]').type(userData.password);
  cy.get('[data-testid="cadastrar"]').click();
});

/**
 * Comando para criar produto
 * @param {Object} productData - Dados do produto
 */
Cypress.Commands.add('createProduct', (productData) => {
  cy.get('[data-testid="cadastrarProdutos"]').click();
  cy.get('[data-testid="nome"]').type(productData.nome);
  cy.get('[data-testid="preco"]').type(productData.preco);
  cy.get('[data-testid="descricao"]').type(productData.descricao);
  cy.get('[data-testid="quantity"]').type(productData.quantidade);
  cy.get('[data-testid="cadastarProdutos"]').click();
});


import swaggerApi from './api/swaggerApi';

Cypress.Commands.add('apiCreateUser', (user) => {
  return swaggerApi.createUser(user);
});

Cypress.Commands.add('apiLoginUser', (credentials) => {
  return swaggerApi.loginUser(credentials);
});

Cypress.Commands.add('apiGetProducts', () => {
  return swaggerApi.getProducts();
});

Cypress.Commands.add('apiCreateProduct', (product, token) => {
  return swaggerApi.createProduct(product, token);
});
