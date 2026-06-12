import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import CatalogPage from './CatalogPage';

// Повністю мокаємо всі хуки роутера, які використовує головна сторінка
jest.mock('react-router-dom', () => ({
  useParams: () => ({ query: '' }),
  useNavigate: () => jest.fn(),
  Link: ({ children }: any) => <a>{children}</a>
}), { virtual: true });

describe('CatalogPage Component', () => {
  it('рендериться без критичних помилок', () => {
    // Тепер нам не потрібен BrowserRouter, бо ми його зімітували
    render(
      <Provider store={store}>
        <CatalogPage />
      </Provider>
    );
  });
});