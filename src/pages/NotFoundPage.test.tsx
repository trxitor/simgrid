import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

// Віртуальна заглушка
jest.mock('react-router-dom', () => ({
  Link: ({ children }: any) => <a>{children}</a>
}), { virtual: true });

describe('NotFoundPage Component', () => {
  it('відображає повідомлення про помилку 404', () => {
    render(<NotFoundPage />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Сторінку не знайдено')).toBeInTheDocument();
  });
});