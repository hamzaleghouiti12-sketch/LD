import { Link } from 'react-router-dom'
import { useAutomationData } from '../hooks/useAutomationData.js'
import { Users, Download } from 'lucide-react'

function ScorePill({ score }) {
    const color = score >= 90 ? '#16a34a' : score >= 75 ? 'var(--color-primary-500)' : '#d97706'
    const bg = score >= 90 ? 'rgba(34,197,94,0.1)' : score >= 75 ? 'rgba(249,115,22,0.1)' : 'rgba(245,158,11,0.1)'
    return (
        <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            fontWeight: 600,
            color,
            background: bg,
            padding: '3px 9px',
            borderRadius: 99,
        }}>
            {score}
        </span>
    )
}

const estadoStyle = {
    'Calificado': { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
    'Contactado': { bg: 'rgba(59,130,246,0.1)', color: '#2563eb' },
    'Negociando': { bg: 'rgba(249,115,22,0.1)', color: 'var(--color-primary-600)' },
    'Nuevo': { bg: 'var(--color-cream-dark)', color: 'var(--color-ink-muted)' },
}

export default function Leads() {
    const { leads, loading } = useAutomationData()

    if (loading) {
        return (
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--color-ink-muted)', fontSize: 13 }}>
                    Cargando datos…
                </div>
            </div>
        )
    }

    return (
        <div className="page-container">
            <div className="page-header animate-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 className="page-title">Leads Enriquecidos</h1>
                    <p className="page-subtitle">{leads.length} leads · Ordenados por score</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-outline"><Download size={14} /> Exportar CSV</button>
                    <button className="btn btn-primary"><Users size={14} /> Sincronizar CRM</button>
                </div>
            </div>

            <div className="card animate-fade-up delay-1">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Contacto</th>
                            <th>Empresa</th>
                            <th>Cargo</th>
                            <th>Email</th>
                            <th>Score</th>
                            <th>Estado</th>
                            <th>Fuente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads
                            .sort((a, b) => b.score - a.score)
                            .map(lead => {
                                const st = estadoStyle[lead.estado] || estadoStyle['Nuevo']
                                return (
                                    <tr key={lead.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{
                                                    width: 30, height: 30, borderRadius: '50%',
                                                    background: `hsl(${(lead.nombre.charCodeAt(0) * 7) % 360}, 60%, 75%)`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0,
                                                }}>
                                                    {lead.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <Link to={`/leads/${lead.id}`} style={{ fontWeight: 500, color: 'var(--color-ink)', textDecoration: 'none' }}>
                                                    {lead.nombre}
                                                </Link>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 500 }}>{lead.empresa}</td>
                                        <td style={{ color: 'var(--color-ink-muted)' }}>{lead.cargo}</td>
                                        <td>
                                            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11.5 }}>{lead.email}</span>
                                        </td>
                                        <td><ScorePill score={lead.score} /></td>
                                        <td>
                                            <span style={{
                                                display: 'inline-block',
                                                fontSize: 11.5, fontWeight: 600,
                                                padding: '3px 9px', borderRadius: 99,
                                                background: st.bg, color: st.color,
                                            }}>
                                                {lead.estado}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="chip">{lead.fuente}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}