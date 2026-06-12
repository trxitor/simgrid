import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

// 1. Повна заглушка для роутера (виправляє помилку useNavigate)
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: any) => <div>{children}</div>,
  Routes: ({ children }: any) => <div>{children}</div>,
  Route: ({ element }: any) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
  useParams: () => ({ query: '' }),
  Link: ({ children }: any) => <a>{children}</a>
}), { virtual: true });

// 2. Заглушка для нативного fetch (щоб тести не стукали в реальну мережу)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('App Component', () => {
  it('рендериться без помилок', () => {
    // Тимчасово ховаємо консоль помилок, щоб не смітити в терміналі
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    spy.mockRestore();
  });
});