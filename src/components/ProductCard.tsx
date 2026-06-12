import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { Product } from '../data/mockData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h3 className={styles.title}>{product.title}</h3>
      <span className={styles.category}>{product.categoryName}</span>
      <div className={styles.price}>${product.price}</div>
      
      {/* Кнопка переходу на детальну сторінку товару (Task #6) */}
      <Link to={`/product/${product.id}`} className={styles.linkButton}>
        Детальніше
      </Link>
    </div>
  );
};

export default ProductCard;