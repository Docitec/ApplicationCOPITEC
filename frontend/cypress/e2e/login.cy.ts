describe('Page de connexion', () => {
  const email = 'romain.denis@docitec.com'
  const goodPassword = 'romain.denis@docitec.com'
  const badPassword = 'wrongpass'

  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it('Connexion avec identifiants valides redirige vers le dashboard', () => {
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(goodPassword)
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('Connexion échoue avec un mauvais mot de passe', () => {
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(badPassword)
    cy.get('button[type="submit"]').click()

    // Redirigé ou message d'erreur visible
    cy.url().should('not.include', '/dashboard')
    cy.contains('Identifiants incorrects.').should('exist') // à adapter selon ta gestion d'erreur
  })
})
