import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts, Product } from '../data/mockData';
import Loader from '../components/Loader';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage: React.FC = () => {
  // Отримання ID з URL згідно з Task #6
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = mockProducts.find(p => p.id === Number(id));
      setProduct(found || null);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <Loader />;
  
  if (!product) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Товар не знайдено</h2>
        <Link to="/" className={styles.backLink}>Повернутися до каталогу</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Назад до каталогу</Link>
      <div className={styles.content}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <div className={styles.info}>
          <h1>{product.title}</h1>
          <span className={styles.category}>{product.categoryName}</span>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.description}>{product.description}</p>
          
          <h3>Характеристики:</h3>
          <ul className={styles.specs}>
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong> <span>{value}</span>
              </li>
            ))}
          </ul>
          <button className={styles.buyButton}>Додати в кошик</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;