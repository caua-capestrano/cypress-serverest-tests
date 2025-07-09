class RegisterPage {
  // Seletores CSS
  get nameInput() { return cy.get('[data-testid="nome"]'); }
  get emailInput() { return cy.get('[data-testid="email"]'); }
  get passwordInput() { return cy.get('[data-testid="password"]'); }
  get adminCheckbox() { return cy.get('[data-testid="checkbox"]'); }
  get registerButton() { return cy.get('[data-testid="cadastrar"]'); }
  get errorMessage() { return cy.get('.alert-secondary'); }

  // Métodos de interação
  fillRegisterForm(userData) {
    this.nameInput.type(userData.nome);
    this.emailInput.type(userData.email);
    this.passwordInput.type(userData.password);
    
    if (userData.administrador) {
      this.adminCheckbox.check();
    }
  }

  submitRegister() {
    this.registerButton.click();
  }

  verifyErrorMessage(message) {
    this.errorMessage.should('be.visible').and('contain', message);
  }
}

export default RegisterPage;