describe('4. List Favorite Articles', () => {

  it('should display empty list when there are no favorites', () => {
    cy.login();
    cy.wait(1000);

    cy.get('.navbar .nav-item [href="#/profile/cooltester1"]').click();
    cy.wait(1000);

    cy.intercept('GET', '/api/articles?limit=10&favorited=cooltester1', {fixture: 'favorites-0.json'});
    cy.get('[href="#/profile/cooltester1/favorites"]').click();
    cy.wait(1000);

    cy.get('app-profile-articles > app-article-list > .app-article-preview').contains('No articles are here... yet.').should('exist')
    cy.logout()
  })

  it('should display favorite articles list and verify the content of preview', () => {
    cy.login();
    cy.wait(1000);

    cy.get('.navbar .nav-item [href="#/profile/cooltester1"]').click();
    cy.wait(1000);

    cy.intercept('GET', '/api/articles?limit=10&favorited=cooltester1', {fixture: 'favorites-11.json'});
    cy.get('[href="#/profile/cooltester1/favorites"]').click();
    cy.wait(1000);

    cy.get('app-profile-articles > app-article-list .article-preview:first')
      .find('h1')
      .should('contain.text', 'QA is cool title')
    cy.get('app-profile-articles > app-article-list .article-preview:first')
      .find('p')
      .should('contain.text', 'QA is cool body')
    cy.get('app-profile-articles > app-article-list .article-preview:first')
      .find('span')
      .should('contain.text', 'Read more...')

    cy.logout()
  })

  it('should display 10 favorites per page and displays pagination links', () => {
    cy.login();
    cy.wait(1000);

    cy.get('.navbar .nav-item [href="#/profile/cooltester1"]').click();
    cy.wait(1000);

    cy.intercept('GET', '/api/articles?limit=10&favorited=cooltester1', {fixture: 'favorites-11.json'});
    cy.get('[href="#/profile/cooltester1/favorites"]').click();
    cy.wait(1000);

    cy.get('app-profile-articles > app-article-list').find('app-article-list-item').should('have.length', 10)
    cy.get('app-pager > .pagination').should('exist')
    cy.logout()
  })

  it('should navigate to 2nd page', () => {
    cy.login();
    cy.wait(1000);

    cy.get('.navbar .nav-item [href="#/profile/cooltester1"]').click();
    cy.wait(1000);

    cy.intercept('GET', '/api/articles?limit=10&favorited=cooltester1', {fixture: 'favorites-11.json'});
    cy.get('[href="#/profile/cooltester1/favorites"]').click();
    cy.wait(1000);
    cy.get('app-pager > ul.pagination li.page-item.active a.page-link').should('contain.text', 1);

    cy.intercept('GET', '/api/articles?limit=10&favorited=cooltester1', {fixture: 'favorites-11.json'});
    cy.get('app-pager > ul.pagination li.page-item:nth-child(2) a.page-link').click()
    cy.wait(1000);
    cy.get('app-pager > ul.pagination li.page-item.active a.page-link').should('contain.text', 2);

    cy.logout()
  })
})