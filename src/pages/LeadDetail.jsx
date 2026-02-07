import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAutomationData } from '../hooks/useAutomationData.js'
import StatusBadge from '../components/StatusBadge'
import { ChevronLeft, ArrowRight } from 'lucide-react'

const estadoStyle = {
    'Calificado': { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
    'Contactado': { bg: 'rgba(59,130,246,0.1)', color: '#2563eb' },
    'Negociando': { bg: 'rgba(249,115,22,0.1)', color: 'var(--color-primary-600)' },
    'Nuevo': { bg: 'var(--color-cream-dark)', color: 'var(--color-ink-muted)' },
}

function scoreColor(score) {
    if (score >= 90) return '#16a34a'
    if (score >= 75) return 'var(--color-primary-500)'
    return '#d97706'
}

export default function LeadDetail() {
    const { id } = useParams()
    const { leads, runs, loading } = useAutomationData()

    if (loading) {
        return (
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--color-ink-muted)', fontSize: 13 }}>
                    Cargando datos…
                </div>
            </div>
        )
    }

    const lead = leads.find(l => l.id === id)

    if (!lead) {
        return (
            <div className="page-container">
                <div style={{ textAlign: 'center', paddingTop: 60 }}>
                    <p style={{ fontSize: 16, color: 'var(--color-ink-muted)', marginBottom: 16 }}>Lead no encontrado: <strong>{id}</strong></p>
                    <Link to="/leads" className="btn btn-outline"><ChevronLeft size={14} /> Volver a Leads</Link>
                </div>
            </div>
        )
    }

    const st = estadoStyle[lead.estado] || estadoStyle['Nuevo']
    const runAsociado = lead.run_id ? runs.find(r => r.id === lead.run_id) : null

    return (
        <div className="page-container">
            <div className="animate-fade-up" style={{ marginBottom: 20 }}>
                <Link to="/leads" className="btn btn-outline" style={{ fontSize: 12, marginBottom: 16, display: 'inline-flex' }}>
                    <ChevronLeft size={14} /> Volver a Leads
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {/* Avatar */}
                    <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: `hsl(${(lead.nombre.charCodeAt(0) * 7) % 360}, 60%, 75%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, fontWeight: 700, color: 'white', flexShrink: 0,
                    }}>
                        {lead.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                        <h1 className="page-title" style={{ margin: 0 }}>{lead.nombre}</h1>
                        <p className="page-subtitle" style={{ margin: 0 }}>{lead.cargo} · {lead.empresa}</p>
                    </div>
                    <span style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-ink-muted)' }}>
                        {lead.id}
                    </span>
                </div>
            </div>

            <div className="two-col">
                {/* Datos del lead */}
                <div className="card animate-fade-up delay-1">
                    <div className="card-header">
                        <h3 className="card-title">Información del Lead</h3>
                    </div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            { label: 'Nombre', value: lead.nombre },
                            { label: 'Empresa', value: lead.empresa },
                            { label: 'Cargo', value: lead.cargo },
                            { label: 'Email', value: lead.email },
                            { label: 'Fuente', value: <span className="chip">{lead.fuente}</span> },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                                <span style={{ color: 'var(--color-ink-muted)', fontWeight: 500 }}>{label}</span>
                                <span style={{ fontWeight: 500, color: 'var(--color-ink)', fontFamily: label === 'Email' ? 'DM Mono, monospace' : 'inherit', fontSize: 12.5 }}>
                                    {value}
                                </span>
                            </div>
                        ))}

                        {/* Estado */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                            <span style={{ color: 'var(--color-ink-muted)', fontWeight: 500 }}>Estado</span>
                            <span style={{
                                display: 'inline-block',
                                fontSize: 11.5, fontWeight: 600,
                                padding: '3px 9px', borderRadius: 99,
                                background: st.bg, color: st.color,
                            }}>
                                {lead.estado}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Score + Run asociado */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Score card */}
                    <div className="card animate-fade-up delay-2">
                        <div className="card-header">
                            <h3 className="card-title">Score</h3>
                            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 22, fontWeight: 600, color: scoreColor(lead.score) }}>
                                {lead.score}
                            </span>
                        </div>
                        <div className="card-body">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${lead.score}%`, background: scoreColor(lead.score) }}
                                />
                            </div>
                            <p className="page-subtitle" style={{ marginTop: 8 }}>
                                {lead.score >= 90 ? 'Lead altamente calificado' : lead.score >= 75 ? 'Buen potencial' : 'Potencial medio — requiere nurturing'}
                            </p>
                        </div>
                    </div>

                    {/* Run asociado */}
                    <div className="card animate-fade-up delay-3">
                        <div className="card-header">
                            <h3 className="card-title">Run Asociado</h3>
                        </div>
                        <div className="card-body">
                            {runAsociado ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                                        <span style={{ color: 'var(--color-ink-muted)', fontWeight: 500 }}>ID</span>
                                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-ink-muted)' }}>{runAsociado.id}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                                        <span style={{ color: 'var(--color-ink-muted)', fontWeight: 500 }}>Estado</span>
                                        <StatusBadge estado={runAsociado.estado} />
                                    </div>
                                    <Link to={`/runs/${runAsociado.id}`} className="btn btn-outline" style={{ justifyContent: 'center', marginTop: 4 }}>
                                        Ver Run asociado <ArrowRight size={13} />
                                    </Link>
                                </div>
                            ) : (
                                <p className="page-subtitle">Este lead no tiene run asociado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
