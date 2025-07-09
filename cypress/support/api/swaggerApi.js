class SwaggerApi {
  baseUrl = 'https://serverest.dev';

  createUser(user) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/usuarios`,
      body: user,
      failOnStatusCode: false,
    });
  }

  loginUser(credentials) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/login`,
      body: credentials,
      failOnStatusCode: false,
    });
  }

  getProducts() {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/produtos`,
    });
  }

  createProduct(product, token) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/produtos`,
      headers: { Authorization: token },
      body: product,
      failOnStatusCode: false,
    });
  }
}

export default new SwaggerApi();
