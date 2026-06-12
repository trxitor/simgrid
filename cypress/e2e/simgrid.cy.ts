describe('SimGrid E2E Tests (Task #4)', () => {
  
  // Тест 1: Перевірка головної сторінки
  it('1. Завантажує головну сторінку та відображає заголовок', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Каталог обладнання SimGrid').should('be.visible');
  });

  // Тест 2: Перевірка лоадера (імітація затримки)
  it('2. Відображає лоадер під час завантаження', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Завантаження даних...').should('be.visible');
  });

  // Тест 3: Перевірка відображення товарів
  it('3. Відображає список товарів після завантаження', () => {
    cy.visit('http://localhost:3000');
    // Чекаємо, поки зникне лоадер і з'являться кнопки товарів (таймаут 4 сек)
    cy.get('a', { timeout: 4000 }).contains('Детальніше').should('have.length.greaterThan', 0);
  });

  // Тест 4: Перевірка роутингу (Task #6) - перехід на сторінку товару
  it('4. Переходить на сторінку деталей товару по кліку', () => {
    cy.visit('http://localhost:3000');
    cy.get('a').contains('Детальніше').first().click();
    // Перевіряємо, що URL змінився на сторінку товару
    cy.url().should('include', '/product/');
    // Перевіряємо, що на сторінці є кнопка покупки
    cy.contains('Додати в кошик').should('be.visible');
  });

  // Тест 5: Перевірка сторінки 404 (Task #6)
  it('5. Відображає сторінку 404 при невірному URL', () => {
    // Спеціально переходимо на неіснуючу сторінку
    cy.visit('http://localhost:3000/invalid-url-123', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
    cy.contains('Сторінку не знайдено').should('be.visible');
    cy.contains('Повернутися на головну').should('be.visible');
  });

});