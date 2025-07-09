class ProductsPage {
  // Seletores CSS - Página principal
  get welcomeMessage() { return cy.get('[data-testid="welcome"]'); }
  get logoutButton() { return cy.get('[data-testid="logout"]'); }
  get addProductButton() { return cy.get('[data-testid="cadastrarProdutos"]'); }
  get listProductsButton() { return cy.get('[data-testid="listarProdutos"]'); }
  get productsList() { return cy.get('table tbody tr'); }
  get noProductsMessage() { return cy.get('.alert-secondary'); }

  // Seletores CSS - Formulário de produto
  get productNameInput() { return cy.get('[data-testid="nome"]'); }
  get productPriceInput() { return cy.get('[data-testid="preco"]'); }
  get productDescriptionInput() { return cy.get('[data-testid="descricao"]'); }
  get productQuantityInput() { return cy.get('[data-testid="quantity"]'); }
  get productImageInput() { return cy.get('[data-testid="imagem"]'); }
  get saveProductButton() { return cy.get('[data-testid="cadastarProdutos"]'); }

  // Métodos de interação - Navegação
  verifyWelcomeMessage(nome) {
    cy.contains(`Bem Vindo ${nome}`).should('exist');
  }

  logout() {
    this.logoutButton.click();
  }

  goToAddProduct() {
    this.addProductButton.click();
  }

  goToListProducts() {
    this.listProductsButton.click();
  }

  // Métodos de interação - Produtos
  fillProductForm(productData) {
    this.productNameInput.type(productData.nome);
    this.productPriceInput.type(productData.preco);
    this.productDescriptionInput.type(productData.descricao);
    this.productQuantityInput.type(productData.quantidade);
    if (productData.imagem) {
      this.productImageInput.selectFile(`cypress/fixtures/${productData.imagem}`);
    }
  }

  saveProduct() {
    this.saveProductButton.click();
  }

  verifyProductExists(productName) {
    this.productsList.contains(productName).should('exist');
  }

  verifyNoProductsMessage() {
    this.noProductsMessage.should('be.visible').and('contain', 'Nenhum produto foi encontrado');
  }

  deleteProduct(productName) {
    this.productsList
      .contains(productName)
      .closest('tr')
      .within(() => {
        cy.get('button.btn-danger').click();
      });
    cy.on('window:confirm', () => true);
    // Espera o produto sumir da lista após exclusão
    cy.contains('table tbody tr', productName).should('not.exist');
  }
}

export default ProductsPage;
