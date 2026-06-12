import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Отримуємо пошуковий запит з URL (Task #6)
  const { query } = useParams<{ query: string }>();

  // Дістаємо дані та статуси прямо з Redux (Task #5)
  const { items: products, status, error } = useSelector((state: RootState) => state.products);

  // Локальний стан для фільтру категорій та поля вводу
  const [selectedCategory, setSelectedCategory] = useState<string>('Всі');
  const [searchInput, setSearchInput] = useState<string>(query || '');

  // Завантаження даних з Redux
  useEffect(() => {
    // Якщо дані ще не завантажувались, відправляємо екшен на їх отримання
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Синхронізація поля вводу з URL, якщо користувач перейшов за прямим посиланням
  useEffect(() => {
    setSearchInput(query || '');
  }, [query]);

  // Обробка пошуку (зміна URL згідно з Task #6)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search/${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/');
    }
  };

  // Автоматично генеруємо унікальні категорії для випадаючого списку
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.categoryName)));
    return ['Всі', ...unique];
  }, [products]);

  // Фільтруємо товари на основі URL-запиту та вибраної категорії
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Фільтр по категорії (без зміни URL)
      const matchCategory = selectedCategory === 'Всі' || product.categoryName === selectedCategory;
      // Фільтр по пошуку (залежить від URL)
      const matchSearch = !query || product.title.toLowerCase().includes(query.toLowerCase());
      
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, query]);

  if (status === 'loading' || status === 'idle') {
    return <Loader />;
  }

  if (status === 'failed') {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <h2>Помилка завантаження</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Task #2: Використання змінної оточення для назви додатку */}
      <h1 className={styles.title}>{process.env.REACT_APP_APP_NAME || 'Каталог обладнання SimGrid'}</h1>
      
      {/* Панель фільтрів та пошуку (Task #6) */}
      <div className={styles.controls}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Пошук обладнання (наприклад: Moza, Pedals)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Знайти</button>
        </form>

        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.filterSelect}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.2rem', color: '#666' }}>
          За вашим запитом обладнання не знайдено. Спробуйте змінити фільтри.
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;