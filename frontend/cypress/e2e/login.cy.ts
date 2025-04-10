describe('Page de connexion', () => {
  const email = 'romain.denis@docitec.com';
  const goodPassword = 'romain.denis@docitec.com'; // à adapter si besoin
  const badPassword = 'wrongpass';

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Connexion avec identifiants valides redirige vers le dashboard', () => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(goodPassword);
    cy.get('button[type="submit"]').click();

    // Vérifie la redirection
    cy.url().should('include', '/dashboard');

    // Vérifie que le token est bien stocké
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.exist;
    });
  });

  it('Connexion échoue avec un mauvais mot de passe', () => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(badPassword);
    cy.get('button[type="submit"]').click();

    // L'utilisateur ne doit pas être redirigé
    cy.url().should('not.include', '/dashboard');

    // Vérifie que le message d'erreur est bien affiché
    cy.contains('Identifiants incorrects.').should('exist'); // adapte ici si ton backend renvoie autre chose
  });
});
