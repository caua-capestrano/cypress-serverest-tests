class LoginPage {
  // Seletores CSS
  get emailInput() { return cy.get('[data-testid="email"]'); }
  get passwordInput() { return cy.get('[data-testid="senha"]'); }
  get loginButton() { return cy.get('[data-testid="entrar"]'); }
  get registerButton() { return cy.get('[data-testid="cadastrar"]'); }
  get errorMessage() { return cy.get('.alert-secondary'); }

  // Métodos de interação
  visit() {
    cy.visit('/login');
  }

  fillLoginForm(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
  }

  submitLogin() {
    this.loginButton.click();
  }

  goToRegister() {
    this.registerButton.click();
  }

  verifyErrorMessage(message) {
    this.errorMessage.should('be.visible').and('contain', message);
  }
}

export default LoginPage;