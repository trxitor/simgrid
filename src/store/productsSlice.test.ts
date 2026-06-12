import reducer, { fetchProducts } from './productsSlice';

describe('Products Redux Slice (Task #5)', () => {
  
  // Імітуємо дані, які тепер приходять "з сервера"
  const mockServerData = [
    { id: 1, title: 'Test Product', categoryName: 'Test', price: 100 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('1. Повертає початковий стан', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('2. Обробляє стан завантаження (pending)', () => {
    const nextState = reducer(undefined, fetchProducts.pending('', undefined));
    expect(nextState.status).toBe('loading');
  });

  it('3. Успішно завантажує дані через fetch (fulfilled)', async () => {
    // Імітуємо успішну відповідь від сервера
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockServerData),
      })
    );

    const nextState = reducer(
        { items: [], status: 'loading', error: null }, 
        fetchProducts.fulfilled(mockServerData as any, '', undefined)
    );
    
    expect(nextState.status).toBe('succeeded');
    expect(nextState.items).toEqual(mockServerData);
  });

  it('4. Обробляє помилку сервера (rejected)', () => {
    const errorState = reducer(
        { items: [], status: 'loading', error: null }, 
        fetchProducts.rejected(new Error('Помилка сервера'), '', undefined)
    );
    expect(errorState.status).toBe('failed');
    expect(errorState.error).toBe('Помилка сервера');
  });
});