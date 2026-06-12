import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Створюємо токсичний компонент, який спеціально кидає помилку
const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  it('перехоплює помилки дочірніх компонентів згідно з Task #3', () => {
    // Тимчасово ховаємо консоль помилок, щоб не смітити в терміналі
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    
    // Використовуємо регулярний вираз /Щось пішло не так/i для гнучкого пошуку
    expect(screen.getByText(/Щось пішло не так/i)).toBeInTheDocument();
    
    spy.mockRestore();
  });
});