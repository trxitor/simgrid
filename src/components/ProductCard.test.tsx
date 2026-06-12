import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

// Створюємо віртуальну заглушку для роутера, щоб Jest не шукав реальні файли
jest.mock('react-router-dom', () => ({
  Link: ({ children }: any) => <a>{children}</a>
}), { virtual: true });

const mockProduct = {
  id: 999,
  title: 'Test Sim Racing Wheel',
  categoryName: 'Кермові бази',
  price: 500,
  description: 'Test description',
  image: 'test-image.jpg',
  specs: { 'Обертання': '900 градусів' }
};

describe('ProductCard Component', () => {
  it('коректно відображає дані товару', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Sim Racing Wheel')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('Кермові бази')).toBeInTheDocument();
  });
});