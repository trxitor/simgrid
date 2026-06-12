import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Оновлюємо стан, щоб наступний рендер показав запасний UI
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Тут можна відправити помилку в систему логування, зараз просто виводимо в консоль
    console.error('Неспіймана помилка в додатку:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif', color: '#333' }}>
          <h2>Упс! Щось пішло не так.</h2>
          <p>Виникла критична помилка. Будь ласка, спробуйте оновити сторінку.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', marginTop: '15px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Оновити сторінку
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;