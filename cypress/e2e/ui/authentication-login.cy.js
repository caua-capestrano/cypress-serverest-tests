import LoginPage from '../../support/pages/LoginPage';
import ProductsPage from '../../support/pages/ProductsPage';

describe('Fluxo de Autenticação Completo', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();

  beforeEach(() => {
    cy.fixture('users').as('users');
  });

  context('Login com credenciais válidas', () => {
    it('deve realizar login com sucesso e redirecionar para área de produtos', function() {
      // Arrange
      const { email, password, nome } = this.users.validUser;
      
      // Act
      loginPage.visit();
      loginPage.fillLoginForm(email, password);
      loginPage.submitLogin();
      
      // Assert
      cy.url().should('contain', '/admin/home');
      productsPage.verifyWelcomeMessage(nome);
    });
  });

  context('Login com credenciais inválidas', () => {
    it('deve exibir mensagem de erro para credenciais inválidas', function() {
      // Arrange
      const { email, password } = this.users.invalidUser;
      
      // Act
      loginPage.visit();
      loginPage.fillLoginForm(email, password);
      loginPage.submitLogin();
      
      // Assert
      cy.url().should('contain', '/login');
      loginPage.verifyErrorMessage('Email e/ou senha inválidos');
    });
  });

  context('Logout e proteção de rotas', () => {
    it('deve realizar logout e impedir acesso a área protegida', function() {
      // Arrange - Login primeiro
      const { email, password } = this.users.validUser;
      cy.login(email, password);
      
      // Act - Fazer logout
      productsPage.logout();
      
      // Assert - Verificar redirecionamento
      cy.url().should('contain', '/login');
      
      // Act - Tentar acessar área protegida
      cy.visit('/admin/home');
      
      // Assert - Deve redirecionar para login
      cy.url().should('contain', '/login');
    });
  });
});