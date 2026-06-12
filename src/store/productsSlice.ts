import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// Імпортуємо тільки інтерфейс Product, бо самі мок-дані тепер беремо з сервера
import { Product } from '../data/mockData';

// РЕАЛЬНИЙ HTTP-запит до сервера (Task #5)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Task #2: Читаємо базовий URL із файлу .env
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    console.log(`[Task #2, #5] Використовується API URL: ${apiUrl}/products.json`);

    // Task #5: Робимо реальний мережевий запит до нашого JSON
    const response = await fetch(`${apiUrl}/products.json`);
    
    // Перевіряємо, чи сервер відповів успішно
    if (!response.ok) {
      throw new Error('Не вдалося завантажити дані з сервера');
    }
    
    // Перетворюємо відповідь сервера у формат JSON
    const data = await response.json();

    return new Promise<Product[]>((resolve) => {
      // Залишаємо твою затримку в 1 секунду для імітації довгої роботи мережі (щоб крутився лоадер)
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }
);

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload; // Дані успішно завантажені
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Щось пішло не так при завантаженні';
      });
  },
});

export default productsSlice.reducer;