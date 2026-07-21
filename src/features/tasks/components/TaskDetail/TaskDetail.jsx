import formatDate from "../../utils/formatDate";

function TaskDetail({ task, onClose }) {
  if (!task) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '360px',
        background: 'white',
        borderLeft: '1px solid #e5e5e5',
        padding: '1.5rem',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500 }}>Información relevante</h2>
        <button onClick={onClose}>×</button>
      </div>

      <p style={{ fontSize: '13px', color: '#888' }}>Título</p>
      <p style={{ marginBottom: '1rem' }}>{task.title}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p style={{ fontSize: '13px', color: '#888' }}>Proceso</p>
          <p>{task.process}</p>
        </div>
        <div>
          <p style={{ fontSize: '13px', color: '#888' }}>Prioridad</p>
          <p>{task.priority}</p>
        </div>
        <div>
          <p style={{ fontSize: '13px', color: '#888' }}>Responsable</p>
          <p>{task.assignedTo}</p>
        </div>
        <div>
          <p style={{ fontSize: '13px', color: '#888' }}>Estado</p>
          <p>{task.status}</p>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#888', marginTop: '1rem' }}>Fecha de creación</p>
      <p>{formatDate(task.createdAt)}</p>
    </div>
  );
}

export default TaskDetail;