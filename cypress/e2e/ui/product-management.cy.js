import LoginPage from '../support/pages/LoginPage';
import ProductsPage from '../support/pages/ProductsPage';

describe('Gestão de Produtos - Ciclo Completo', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();

  beforeEach(() => {
    cy.fixture('users').as('users');
    cy.fixture('products').as('products');
    
    // Setup - Login como admin
    cy.get('@users').then(users => {
      const { email, password } = users.validUser;
      cy.login(email, password);
    });
  });

  context('Cadastro de produto', () => {
    it('deve cadastrar produto com sucesso', function() {
      const productData = { ...this.products.validProduct, imagem: 'foto.jpg' };
      
      productsPage.goToAddProduct();
      productsPage.fillProductForm(productData);
      productsPage.saveProduct();
      
      cy.url().should('contain', '/admin/listarprodutos');
      productsPage.verifyProductExists(productData.nome);
    });

    it('deve validar campos obrigatórios do produto', () => {
      productsPage.goToAddProduct();
      productsPage.saveProduct();
      
      cy.get('.alert-secondary')
        .should('be.visible')
        .and('contain', 'Nome é obrigatório');
    });
  });

  context('Exclusão de produto', () => {
    it('deve excluir produto e atualizar listagem', function() {
      const productName = this.products.validProduct.nome;

      // Navegar para lista de produtos
      productsPage.goToListProducts();

      // Verificar se produto está na lista
      productsPage.productsList.should('contain', productName);

      // Excluir produto pelo nome
      productsPage.deleteProduct(productName);

      // Validar que produto não está mais na lista
      productsPage.productsList.should('not.contain', productName);
    });
  });
});
