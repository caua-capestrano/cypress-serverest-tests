import LoginPage from '../../support/pages/LoginPage';
import RegisterPage from '../../support/pages/RegisterPage';
import ProductsPage from '../../support/pages/ProductsPage';

describe('Jornada do Usuário Novo (Onboarding)', () => {
  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();
  const productsPage = new ProductsPage();

  beforeEach(() => {
    cy.fixture('users').as('users');
  });

  context('Cadastro de novo usuário', () => {
    it('deve criar conta com sucesso e realizar primeiro acesso', function() {
      // Arrange
      const userData = {
        ...this.users.newUser,
        email: `teste.${Date.now()}@ambevtech.com` // Email único
      };
      
      // Act - Ir para cadastro
      loginPage.visit();
      loginPage.goToRegister();
      
      // Act - Preencher formulário
      registerPage.fillRegisterForm(userData);
      registerPage.submitRegister();
      
      // Assert - Verificar redirecionamento após cadastro
      cy.contains('Cadastro realizado com sucesso').should('be.visible');
      cy.url().should('contain', '/home');
      
    });
  });

  context('Validações do formulário de cadastro', () => {
    it('deve validar campos obrigatórios', () => {
      // Arrange & Act
      loginPage.visit();
      loginPage.goToRegister();
      registerPage.submitRegister();
      
      // Assert
      registerPage.verifyErrorMessage('Nome é obrigatório');
      registerPage.verifyErrorMessage('Email é obrigatório');
      registerPage.verifyErrorMessage('Password é obrigatório');
    });

    it.only('deve impedir cadastro com email já existente', function() {
      // Arrange
      const { email, password, nome } = this.users.validUser;
      
      // Act
      loginPage.visit();
      loginPage.goToRegister();
      registerPage.fillRegisterForm({ nome, email, password });
      registerPage.submitRegister();
      
      // Assert
      registerPage.verifyErrorMessage('Este email já está sendo usado');
    });
  });
});