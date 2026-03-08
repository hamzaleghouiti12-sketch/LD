import { Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { useAutomationData } from '../hooks/useAutomationData.js'
import { Play, Filter } from 'lucide-react'

export default function Runs() {
    const { runs, loading } = useAutomationData();

    if (loading) {
      return (
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'center',
            justifyContent: 'center', height: 200,
            color: 'var(--color-ink-muted)', fontSize: 13 }}>
            Cargando datos…
          </div>
        </div>
      );
    }

    return (
        <div className="page-container">
            <div className="page-header animate-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 className="page-title">Ejecuciones</h1>
                    <p className="page-subtitle">Historial completo de automatizaciones ejecutadas</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-outline"><Filter size={14} /> Filtrar</button>
                    <button className="btn btn-orange"><Play size={14} /> Nuevo Run</button>
                </div>
            </div>

            <div className="card animate-fade-up delay-1">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID Run</th>
                            <th>Automatización</th>
                            <th>Estado</th>
                            <th>Fecha Inicio</th>
                            <th>Duración</th>
                            <th>Pasos</th>
                            <th>Leads</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {runs.map((run, i) => (
                            <tr key={run.id} style={{ animationDelay: `${0.05 * i}s` }}>
                                <td>
                                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-ink-muted)' }}>
                                        {run.id}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 500, color: 'var(--color-ink)' }}>{run.nombre}</td>
                                <td><StatusBadge estado={run.estado} /></td>
                                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 12 }}>{run.inicio}</td>
                                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 12 }}>{run.duracion}</td>
                                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-ink-muted)' }}>{run.pasos}</td>
                                <td>
                                    {run.leads > 0
                                        ? <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--color-primary-500)' }}>{run.leads}</span>
                                        : <span style={{ color: 'var(--color-ink-muted)' }}>—</span>
                                    }
                                </td>
                                <td>
                                    <Link to={`/runs/${run.id}`} className="btn btn-outline" style={{ fontSize: 11, padding: '4px 10px' }}>
                                        Detalles →
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}