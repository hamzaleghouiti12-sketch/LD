const map = {
    completado: 'success',
    error: 'error',
    ejecutando: 'running',
    pendiente: 'pending',
}

const labels = {
    completado: 'Completado',
    error: 'Error',
    ejecutando: 'Ejecutando',
    pendiente: 'Pendiente',
}

export default function StatusBadge({ estado }) {
    const cls = map[estado] || 'pending'
    return (
        <span className={`status-badge ${cls}`}>
            {labels[estado] || estado}
        </span>
    )
}