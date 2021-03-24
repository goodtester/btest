describe('5. View Favorite Article', () => {

  it('should open article from favorites list and verify article content', () => {
    cy.login();
    cy.wait(1000);

    cy.get('.navbar .nav-item [href="#/profile/cooltester1"]').click();
    cy.wait(1000);

    cy.intercept('GET', '/api/articles?limit=10&favorited=cooltester1', {fixture: 'favorites-11.json'});
    cy.get('[href="#/profile/cooltester1/favorites"]').click();
    cy.wait(1000);

    cy.get('app-profile-articles > app-article-list .article-preview:first')
      .find('a.preview-link')
      .click()
    cy.wait(1000);
    cy.get('div.article-page > div.banner')
      .find('h1')
      .should('contain.text', 'QA is cool title')
    cy.get('div.article-page > div.container.page')
      .find('.article-content')
      .should('contain.text', 'QA is cool body')
    cy.logout()
  })
})