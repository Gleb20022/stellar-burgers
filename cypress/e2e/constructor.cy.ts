/// <reference types="cypress" />

describe('Тестирование конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Тестирование добавления ингредиентов в конструктор', () => {
    cy.wait('@getIngredients');

    cy.get('[data-cy=bun-ingredients]')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('.constructor-element_pos_top')
      .should('contain.text', 'Ингредиент 1')
      .and('exist');
    cy.get('.constructor-element_pos_bottom')
      .should('contain.text', 'Ингредиент 1')
      .and('exist');

    cy.get('[data-cy=mains-ingredients]')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=sauces-ingredients]')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('.constructor-element')
      .not('.constructor-element_pos_top, .constructor-element_pos_bottom')
      .should('contain.text', 'Ингредиент 2')
      .and('exist');
  });

  describe('Тестирование модального окна', () => {
    const modalSelector = '#modals';
    const modalName = 'Ингредиент 8';
    const overlaySelector = '#overlay';

    beforeEach(() => {
      cy.get(modalSelector).children().should('have.length', 0);
    });

    it('Открытие модального окна ингредиента', () => {
      cy.contains(modalName).click();
      cy.get(modalSelector).children().should('have.length', 2);
      cy.get(modalSelector).contains(modalName);
    });

    it('Закрытие модального окна по клику на крестик', () => {
      cy.contains(modalName).click();
      cy.get(modalSelector).find('button').click();
      cy.get(modalSelector).children().should('have.length', 0);
    });

    it('Закрытие модального окна по клику на overlay', () => {
      cy.contains(modalName).click();
      cy.get(overlaySelector).click({ force: true });
      cy.get(modalSelector).children().should('have.length', 0);
    });
  });
});

describe('Тестирование оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'test-accessToken');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Тестирование создания заказа', () => {
    cy.get('.text_type_main-default').contains('Выберите булки');
    cy.get('.text_type_main-default').contains('Выберите начинку');

    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('.text_type_digits-large').should('have.text', '1234');

    cy.get('#overlay').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);

    cy.get('.text_type_main-default').contains('Выберите булки');
    cy.get('.text_type_main-default').contains('Выберите начинку');
  });
});
