import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ProductDetailsPage from './ProductDetailsPage';

// Мокаємо роутер, імітуючи, що ми перейшли на товар з ID = 1
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
  Link: ({ children }: any) => <a>{children}</a>
}), { virtual: true });

describe('ProductDetailsPage Component', () => {
  it('рендериться без критичних помилок', () => {
    render(
      <Provider store={store}>
        <ProductDetailsPage />
      </Provider>
    );
  });
});