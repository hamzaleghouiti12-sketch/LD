import { useParams, Link } from 'react-router-dom'
import { runs, runSteps } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import { CheckCircle, XCircle, Clock, ChevronLeft } from 'lucide-react'

const stepIcon = (estado) => {
    if (estado === 'completado') return <CheckCircle size={14} color="#16a34a" />
    if (estado === 'error') return <XCircle size={14} color="#dc2626" />
    return <Clock size={14} color="#d97706" />
}

const stepDotStyle = (estado) => {
    const base = { width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
    if (estado === 'completado') return { ...base, background: 'rgba(34,197,94,0.12)', border: '1.5px solid rgba(34,197,94,0.3)' }
    if (estado === 'error') return { ...base, background: 'rgba(239,68,68,0.12)', border: '1.5px solid rgba(239,68,68,0.3)' }
    return { ...base, background: 'rgba(245,158,11,0.12)', border: '1.5px solid rgba(245,158,11,0.3)' }
}

export default function RunDetail() {
    const { id } = useParams()
    const run = runs.find(r => r.id === id) || runs[0]

    return (
        <div className="page-container">
            <div className="animate-fade-up" style={{ marginBottom: 20 }}>
                <Link to="/runs" className="btn btn-outline" style={{ fontSize: 12, marginBottom: 16, display: 'inline-flex' }}>
                    <ChevronLeft size={14} /> Volver a Ejecuciones
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <h1 className="page-title" style={{ margin: 0 }}>{run.nombre}</h1>
                    <StatusBadge estado={run.estado} />
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-ink-muted)', marginLeft: 'auto' }}>
                        {run.id}
                    </span>
                </div>
                <p className="page-subtitle" style={{ marginTop: 4 }}>
                    Inicio: {run.inicio} · Duración: {run.duracion} · {run.pasos} pasos · {run.leads} leads generados
                </p>
            </div>

            <div className="two-col">
                {/* Timeline de pasos */}
                <div className="card animate-fade-up delay-1">
                    <div className="card-header">
                        <h3 className="card-title">Pipeline de Pasos</h3>
                        <span style={{ fontSize: 12, color: 'var(--color-ink-muted)', fontFamily: 'DM Mono, monospace' }}>
                            {runSteps.filter(s => s.estado === 'completado').length}/{runSteps.length}
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="steps-list">
                            {runSteps.map((step, i) => (
                                <div key={step.id} className="step-item">
                                    <div className="step-line-col">
                                        <div style={stepDotStyle(step.estado)}>
                                            {stepIcon(step.estado)}
                                        </div>
                                        {i < runSteps.length - 1 && <div className="step-connector" />}
                                    </div>
                                    <div className="step-content">
                                        <p className="step-title">{step.titulo}</p>
                                        <p className="step-meta">{step.log}</p>
                                        <p className="step-meta" style={{ marginTop: 2 }}>
                                            ⏱ {step.duracion}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info del run */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card animate-fade-up delay-2">
                        <div className="card-header">
                            <h3 className="card-title">Resumen</h3>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { label: 'Estado', value: <StatusBadge estado={run.estado} /> },
                                { label: 'Inicio', value: run.inicio },
                                { label: 'Duración total', value: run.duracion },
                                { label: 'Pasos ejecutados', value: `${run.pasos} pasos` },
                                { label: 'Leads generados', value: run.leads > 0 ? run.leads : '—' },
                            ].map(({ label, value }) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                                    <span style={{ color: 'var(--color-ink-muted)', fontWeight: 500 }}>{label}</span>
                                    <span style={{ fontWeight: 500, color: 'var(--color-ink)', fontFamily: typeof value === 'string' ? 'DM Mono, monospace' : 'inherit', fontSize: 12.5 }}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card animate-fade-up delay-3">
                        <div className="card-header">
                            <h3 className="card-title">Acciones</h3>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button className="btn btn-orange" style={{ justifyContent: 'center' }}>↻ Re-ejecutar Run</button>
                            <button className="btn btn-outline" style={{ justifyContent: 'center' }}>⬇ Exportar Log</button>
                            <button className="btn btn-outline" style={{ justifyContent: 'center', color: '#dc2626' }}>✕ Archivar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}