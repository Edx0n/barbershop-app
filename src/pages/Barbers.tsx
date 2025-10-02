import { useState } from 'react';
import { useBarberStore } from '../store/barber-store';

export const Barbers = () => {
  const { barbers, addBarber, deleteBarber, toggleBarberStatus } = useBarberStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    addBarber({
      ...formData,
      isActive: true,
    });
    setShowModal(false);
    setFormData({ name: '', phone: '', email: '', specialty: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Barbeiros</h2>
        <p>Gerencie a equipe de profissionais</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Lista de Barbeiros</h3>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Novo Barbeiro
          </button>
        </div>

        {barbers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💈</div>
            <h3>Nenhum barbeiro cadastrado</h3>
            <p>Comece adicionando sua equipe</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Adicionar Barbeiro
            </button>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Especialidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {barbers.map((barber) => (
                <tr key={barber.id}>
                  <td>{barber.name}</td>
                  <td>{barber.phone}</td>
                  <td>{barber.email}</td>
                  <td>{barber.specialty}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        barber.isActive ? 'completed' : 'cancelled'
                      }`}
                    >
                      {barber.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => toggleBarberStatus(barber.id)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      {barber.isActive ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteBarber(barber.id)}
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
              <h3>Novo Barbeiro</h3>
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

              <div className="form-group">
                <label>Especialidade *</label>
                <input
                  type="text"
                  required
                  value={formData.specialty}
                  onChange={(e) =>
                    setFormData({ ...formData, specialty: e.target.value })
                  }
                  placeholder="Ex: Cortes Clássicos, Barba, etc."
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
                  Adicionar Barbeiro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

