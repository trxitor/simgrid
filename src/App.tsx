import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    // Згідно з Task #3 обертаємо весь додаток в ErrorBoundary
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          {/* Новий роут для пошуку згідно з Task #6 */}
          <Route path="/search/:query" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          {/* Обробка невірних URL згідно з Task #6 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;