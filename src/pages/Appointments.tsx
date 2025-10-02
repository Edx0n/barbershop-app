import { useState } from 'react';
import { useAppointmentStore } from '../store/appointment-store';
import { useCustomerStore } from '../store/customer-store';
import { useServiceStore } from '../store/service-store';
import { useBarberStore } from '../store/barber-store';
import { formatDateTime } from '../utils/date-utils';
import type { Appointment, AppointmentStatus } from '../types';

export const Appointments = () => {
  const { appointments, addAppointment, updateAppointmentStatus, deleteAppointment } =
    useAppointmentStore();
  const { customers } = useCustomerStore();
  const { services } = useServiceStore();
  const { barbers } = useBarberStore();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    barberId: '',
    serviceId: '',
    date: '',
    time: '',
    notes: '',
  });

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const dateTime = new Date(`${formData.date}T${formData.time}`);

    addAppointment({
      customerId: formData.customerId,
      barberId: formData.barberId,
      serviceId: formData.serviceId,
      date: dateTime,
      status: 'scheduled',
      notes: formData.notes || undefined,
    });

    setShowModal(false);
    setFormData({
      customerId: '',
      barberId: '',
      serviceId: '',
      date: '',
      time: '',
      notes: '',
    });
  };

  const handleStatusChange = (id: string, status: AppointmentStatus): void => {
    updateAppointmentStatus(id, status);
  };

  const getCustomerName = (customerId: string): string => {
    const customer = customers.find((c) => c.id === customerId);
    return customer?.name || 'Cliente não encontrado';
  };

  const getBarberName = (barberId: string): string => {
    const barber = barbers.find((b) => b.id === barberId);
    return barber?.name || 'Barbeiro não encontrado';
  };

  const getServiceName = (serviceId: string): string => {
    const service = services.find((s) => s.id === serviceId);
    return service?.name || 'Serviço não encontrado';
  };

  return (
    <div>
      <div className="page-header">
        <h2>Agendamentos</h2>
        <p>Gerencie todos os agendamentos da barbearia</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Lista de Agendamentos</h3>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Novo Agendamento
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <h3>Nenhum agendamento cadastrado</h3>
            <p>Comece criando seu primeiro agendamento</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Criar Agendamento
            </button>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Data/Hora</th>
                <th>Cliente</th>
                <th>Barbeiro</th>
                <th>Serviço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{formatDateTime(appointment.date)}</td>
                  <td>{getCustomerName(appointment.customerId)}</td>
                  <td>{getBarberName(appointment.barberId)}</td>
                  <td>{getServiceName(appointment.serviceId)}</td>
                  <td>
                    <select
                      className={`status-badge ${appointment.status}`}
                      value={appointment.status}
                      onChange={(e) =>
                        handleStatusChange(
                          appointment.id,
                          e.target.value as AppointmentStatus
                        )
                      }
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="scheduled">Agendado</option>
                      <option value="completed">Concluído</option>
                      <option value="cancelled">Cancelado</option>
                      <option value="no-show">Faltou</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAppointment(appointment.id)}
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
              <h3>Novo Agendamento</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Cliente *</label>
                <select
                  required
                  value={formData.customerId}
                  onChange={(e) =>
                    setFormData({ ...formData, customerId: e.target.value })
                  }
                >
                  <option value="">Selecione um cliente</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Barbeiro *</label>
                <select
                  required
                  value={formData.barberId}
                  onChange={(e) =>
                    setFormData({ ...formData, barberId: e.target.value })
                  }
                >
                  <option value="">Selecione um barbeiro</option>
                  {barbers
                    .filter((b) => b.isActive)
                    .map((barber) => (
                      <option key={barber.id} value={barber.id}>
                        {barber.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label>Serviço *</label>
                <select
                  required
                  value={formData.serviceId}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceId: e.target.value })
                  }
                >
                  <option value="">Selecione um serviço</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.duration} min
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Data *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Horário *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observações adicionais..."
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
                  Criar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

