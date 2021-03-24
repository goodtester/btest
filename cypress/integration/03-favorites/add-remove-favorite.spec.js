describe('3. Add / Remove Favorite Article', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/articles?limit=10', {fixture: 'articles.json'});
    cy.intercept('GET', '/api/articles/feed?limit=10', {fixture: 'articles.json'});
    cy.intercept('GET', '/api/articles/*', {fixture: 'article.json'})
    cy.intercept('POST', '/api/articles/*/favorite', {fixture: 'favorite.json'})
    cy.intercept('DELETE', '/api/articles/*/favorite', {fixture: 'article.json'})

  });

  it('should add and remove favorite from Global Feed', () => {
    cy.login();
    cy.wait(1000);

    cy.get('div.feed-toggle ul.nav > li:nth-child(2) > .nav-link').click();
    cy.wait(1000);

    cy.get('app-article-list .article-preview:first button .info')
      .should('contain.text', '0')
    cy.get('app-article-list .article-preview:first button').click();
    cy.wait(100);
    cy.get('app-article-list .article-preview:first button .info')
      .should('contain.text', '1')
    cy.get('app-article-list .article-preview:first button').click();
    cy.wait(100)
    cy.get('app-article-list .article-preview:first button .info')
      .should('contain.text', '0')
    cy.logout()
  })

  it('should add and remove favorite from My articles', () => {
    cy.login();
    cy.wait(1000);

    cy.get('div.feed-toggle ul.nav > li:nth-child(2) > .nav-link').click();
    cy.wait(1000);

    cy.get('app-article-list .article-preview:first button .info')
      .should('contain.text', '0')
    cy.get('app-article-list .article-preview:first button').click();
    cy.wait(100);
    cy.get('app-article-list .article-preview:first button .info')
      .should('contain.text', '1')
    cy.get('app-article-list .article-preview:first button').click();
    cy.wait(100)
    cy.get('app-article-list .article-preview:first button .info')
      .should('contain.text', '0')
    cy.logout()
  })

  it('should add and remove favorite from Article page', () => {
    cy.login();
    cy.wait(1000);

    cy.get('div.feed-toggle ul.nav > li:nth-child(1) > .nav-link').click();
    cy.wait(1000);

    cy.get('app-article-list .article-preview:first')
      .find('a.preview-link')
      .click()
    cy.wait(1000);

    cy.get('div.article-page > div.banner button')
      .should('contain.text', 'Favorite Post')
    cy.get('div.article-page > div.banner button')
      .contains('Favorite Post').click()
    cy.wait(1000);
    cy.get('div.article-page > div.banner button')
      .should('contain.text', 'Unfavorite Post')
    cy.get('div.article-page > div.banner button')
      .contains('Unfavorite Post').click()

    cy.logout()
  })
})