import { useState } from 'react';
import { useCustomerStore } from '../store/customer-store';
import { formatDate } from '../utils/date-utils';

export const Customers = () => {
  const { customers, addCustomer, deleteCustomer } = useCustomerStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    addCustomer(formData);
    setShowModal(false);
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Clientes</h2>
        <p>Gerencie sua base de clientes</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Lista de Clientes</h3>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Novo Cliente
          </button>
        </div>

        {customers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>Nenhum cliente cadastrado</h3>
            <p>Comece adicionando seu primeiro cliente</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Adicionar Cliente
            </button>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Total de Visitas</th>
                <th>Última Visita</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.totalVisits}</td>
                  <td>{customer.lastVisit ? formatDate(customer.lastVisit) : 'Nunca'}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Novo Cliente</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>

              <div className="form-group">
                <label>Telefone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Adicionar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

