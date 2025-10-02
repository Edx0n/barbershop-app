import { useState } from 'react';
import { useServiceStore } from '../store/service-store';
import { formatCurrency } from '../utils/currency-utils';

export const Services = () => {
  const { services, addService, updateService, deleteService } = useServiceStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    addService({
      name: formData.name,
      description: formData.description,
      duration: Number(formData.duration),
      price: Number(formData.price),
    });
    setShowModal(false);
    setFormData({ name: '', description: '', duration: '', price: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Serviços</h2>
        <p>Gerencie os serviços oferecidos</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Lista de Serviços</h3>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Novo Serviço
          </button>
        </div>

        {services.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✂️</div>
            <h3>Nenhum serviço cadastrado</h3>
            <p>Comece adicionando seus serviços</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Adicionar Serviço
            </button>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Duração</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>{service.duration} min</td>
                  <td>{formatCurrency(service.price)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteService(service.id)}
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
              <h3>Novo Serviço</h3>
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
                  placeholder="Nome do serviço"
                />
              </div>

              <div className="form-group">
                <label>Descrição *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descrição do serviço"
                />
              </div>

              <div className="form-group">
                <label>Duração (minutos) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="30"
                />
              </div>

              <div className="form-group">
                <label>Preço (R$) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="35.00"
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
                  Adicionar Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

