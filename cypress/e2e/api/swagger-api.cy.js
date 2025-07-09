describe('Serverest API - Ciclo Básico', () => {
  const baseUrl = 'https://serverest.dev';

  // Cenário 1: Cadastro de usuário
  it('Deve cadastrar um usuário novo com sucesso', () => {
    const newUser = {
      nome: `Teste API ${Date.now()}`,
      email: `testeapi${Date.now()}@teste.com`,
      password: '1234567',
      administrador: "true"
    };

    cy.request({
      method: 'POST',
      url: `${baseUrl}/usuarios`,
      body: newUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.exist;
    });
  });

  // Cenário 2: Login de usuário
  it('Deve logar um usuário existente e retornar token', () => {
    const loginUser = {
      email: 'admin@serverest.dev',  // email válido existente no sistema
      password: 'teste'
    };

    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      body: loginUser
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authorization).to.exist;
    });
  });

  // Cenário 3: Listar produtos
  it('Deve listar produtos com sucesso', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/produtos`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.be.an('array');
    });
  });
});
