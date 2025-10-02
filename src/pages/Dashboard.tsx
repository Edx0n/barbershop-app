import { useAppointmentStore } from '../store/appointment-store';
import { useCustomerStore } from '../store/customer-store';
import { useServiceStore } from '../store/service-store';
import { formatCurrency } from '../utils/currency-utils';
import { formatDateTime, isToday } from '../utils/date-utils';

export const Dashboard = () => {
  const { appointments } = useAppointmentStore();
  const { customers } = useCustomerStore();
  const { services, getServiceById } = useServiceStore();

  const todayAppointments = appointments.filter((apt) => isToday(apt.date));
  const completedToday = todayAppointments.filter((apt) => apt.status === 'completed');
  
  const todayRevenue = completedToday.reduce((total, apt) => {
    const service = getServiceById(apt.serviceId);
    return total + (service?.price || 0);
  }, 0);

  const upcomingAppointments = todayAppointments
    .filter((apt) => apt.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Visão geral do seu negócio</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">📅</div>
          <div className="stat-info">
            <h4>Agendamentos Hoje</h4>
            <p>{todayAppointments.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">✅</div>
          <div className="stat-info">
            <h4>Concluídos Hoje</h4>
            <p>{completedToday.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">💰</div>
          <div className="stat-info">
            <h4>Receita Hoje</h4>
            <p>{formatCurrency(todayRevenue)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon danger">👥</div>
          <div className="stat-info">
            <h4>Total de Clientes</h4>
            <p>{customers.length}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Próximos Agendamentos</h3>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <h3>Nenhum agendamento pendente</h3>
            <p>Não há agendamentos pendentes para hoje</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((appointment) => {
                const service = getServiceById(appointment.serviceId);
                return (
                  <tr key={appointment.id}>
                    <td>{formatDateTime(appointment.date)}</td>
                    <td>Cliente #{appointment.customerId.slice(0, 8)}</td>
                    <td>{service?.name || 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${appointment.status}`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Serviços Disponíveis</h3>
        </div>
        <div className="stats-grid">
          {services.map((service) => (
            <div key={service.id} className="stat-card">
              <div className="stat-icon primary">✂️</div>
              <div className="stat-info">
                <h4>{service.name}</h4>
                <p>{formatCurrency(service.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

