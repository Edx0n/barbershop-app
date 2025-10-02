import { useState } from 'react';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { Appointments } from './pages/Appointments';
import { Customers } from './pages/Customers';
import { Services } from './pages/Services';
import { Barbers } from './pages/Barbers';

type Page = 'dashboard' | 'appointments' | 'customers' | 'services' | 'barbers';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'customers':
        return <Customers />;
      case 'services':
        return <Services />;
      case 'barbers':
        return <Barbers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Barbershop</h1>
          <p>Sistema de Gerenciamento</p>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li>
              <button
                className={currentPage === 'dashboard' ? 'active' : ''}
                onClick={() => setCurrentPage('dashboard')}
              >
                <span>📊</span> Dashboard
              </button>
            </li>
            <li>
              <button
                className={currentPage === 'appointments' ? 'active' : ''}
                onClick={() => setCurrentPage('appointments')}
              >
                <span>📅</span> Agendamentos
              </button>
            </li>
            <li>
              <button
                className={currentPage === 'customers' ? 'active' : ''}
                onClick={() => setCurrentPage('customers')}
              >
                <span>👥</span> Clientes
              </button>
            </li>
            <li>
              <button
                className={currentPage === 'services' ? 'active' : ''}
                onClick={() => setCurrentPage('services')}
              >
                <span>✂️</span> Serviços
              </button>
            </li>
            <li>
              <button
                className={currentPage === 'barbers' ? 'active' : ''}
                onClick={() => setCurrentPage('barbers')}
              >
                <span>💈</span> Barbeiros
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;

