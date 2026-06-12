import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '6rem', margin: '0', color: '#333' }}>404</h1>
      <h2 style={{ color: '#666' }}>Сторінку не знайдено</h2>
      <p style={{ margin: '20px 0', color: '#888' }}>
        Схоже, ви перейшли за невірним посиланням або сторінка була видалена.
      </p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFoundPage;