describe('Test peekobot working in docs', () => {
  beforeEach(() => {
    cy.visit('./docs/index.html', {
      onBeforeLoad(win) {
        // install run the callback passed to setTimeout.
        cy.stub(win, 'setTimeout', cb => cb());
      },
    });
    cy.document().then(document => {
      document.querySelector('style').insertAdjacentHTML('beforeBegin', `
        <style id="cypress-styles">
         * {
           /* disable all kinds of animations while E2E tests run */
           transition: none !important;
           transform: none !important;
           animation: none !important;
         }
        </style>
      `);
    });
  });

  it('test that initial message is shown in chat', () => {
    cy.contains('Hi! Welcome to Peekobot.').should('be.visible');
  });

  it('works for Yes option', () => {
    cy.get('button').contains('👋').click();
    cy.get('.chat-ask').eq(0).should('have.text', '👋').should('have.class', 'activated');
    cy.get('.chat-response').eq(1).should(
      'have.text',
      'Peekobot is a really simple, choice-driven chatbot framework made in less than 100 lines of vanilla JavaScript',
    );
    cy.get('.chat-response').eq(2).should(
      'have.text',
      'But you probably knew that anyway.',
    );
    cy.get('button').contains('Yes, I did!').click();
    cy.get('.chat-ask').eq(1).should('have.text', 'Yes, I did!').should('have.class', 'activated');
    cy.get('.chat-response').eq(3).should(
      'have.text',
      'Awesome. This chat is still in development. Happy coding!',
    );
  });

  it('works for No option', () => {
    cy.get('button').contains('👋').click();
    cy.get('button').contains('Nope, this is news.').click();
    cy.get('.chat-ask').eq(1).should('have.text', 'Nope, this is news.').should('have.class', 'activated');
    cy.get('.chat-response').eq(3).should(
      'have.text',
      "Aah, you're missing out!",
    );
    cy.get('.chat-response').eq(4).should(
      'have.text',
      'You should check it out on GitHub',
    );
    cy.get('a').contains('Go to GitHub').should('have.attr', 'href').and('eq', 'https://github.com/peekobot/peekobot');
  });
});
