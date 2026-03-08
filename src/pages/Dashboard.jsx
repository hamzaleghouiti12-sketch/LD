import { Zap, CheckCircle, Users, AlertTriangle, Clock } from 'lucide-react'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import MiniChart from '../components/MiniChart'
import { useAutomationData } from '../hooks/useAutomationData.js'
import { calcSuccessRate, calcTotalLeads, calcAvgDuration } from '../services/calculations.js'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const { runs, weeklyActivity, errors, loading } = useAutomationData();

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

    const kpiCards = [
        {
            icon: <Zap size={16} color="var(--color-primary-500)" />,
            iconBg: 'rgba(249,115,22,0.10)',
            value: runs.length.toLocaleString(),
            label: 'Ejecuciones Totales',
            badge: '+12', // TODO: calcular desde datos reales
            badgeType: 'up',
            delay: 'delay-1',
        },
        {
            icon: <CheckCircle size={16} color="#16a34a" />,
            iconBg: 'rgba(34,197,94,0.10)',
            value: `${calcSuccessRate(runs)}%`,
            label: 'Tasa de Éxito',
            badge: '2.1%',
            badgeType: 'up',
            delay: 'delay-2',
        },
        {
            icon: <Users size={16} color="#2563eb" />,
            iconBg: 'rgba(59,130,246,0.10)',
            value: calcTotalLeads(runs).toLocaleString(),
            label: 'Leads Activos',
            badge: '18',
            badgeType: 'up',
            delay: 'delay-3',
        },
        {
            icon: <AlertTriangle size={16} color="#dc2626" />,
            iconBg: 'rgba(239,68,68,0.10)',
            value: errors.length,
            label: 'Errores',
            badge: '3',
            badgeType: 'down',
            delay: 'delay-4',
        },
        {
            icon: <Clock size={16} color="var(--color-ink-muted)" />,
            iconBg: 'var(--color-cream-dark)',
            value: calcAvgDuration(runs),
            label: 'Duración Media',
            delay: 'delay-5',
        },
    ]

    const recent = runs.slice(0, 5)

    return (
        <div className="page-container">
            <div className="page-header animate-fade-up">
                <h1 className="page-title">Dashboard de Control</h1>
                <p className="page-subtitle">Resumen en tiempo real de automatizaciones y leads · Hoy, 10 junio 2025</p>
            </div>

            {/* KPIs */}
            <div className="kpi-grid">
                {kpiCards.map((k, i) => (
                    <KpiCard key={i} {...k} />
                ))}
            </div>

            {/* Gráfico + actividad semanal */}
            <div className="three-col">
                <div className="card animate-fade-up delay-3">
                    <div className="card-header">
                        <h3 className="card-title">Actividad Semanal</h3>
                        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--color-ink-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-ink)', display: 'inline-block' }} /> Runs
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-primary-400)', display: 'inline-block' }} /> Leads
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(239,68,68,0.5)', display: 'inline-block' }} /> Errores
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <MiniChart data={weeklyActivity} />
                    </div>
                </div>

                <div className="card animate-fade-up delay-4">
                    <div className="card-header">
                        <h3 className="card-title">Estado del Sistema</h3>
                    </div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { label: 'LinkedIn Scraper', pct: 98, color: 'var(--color-success)' },
                            { label: 'HubSpot Sync', pct: 72, color: 'var(--color-primary-400)' },
                            { label: 'Email Outreach', pct: 91, color: 'var(--color-success)' },
                            { label: 'Lead Scoring AI', pct: 55, color: 'var(--color-warning)' },
                        ].map(({ label, pct, color }) => (
                            <div key={label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12.5 }}>
                                    <span style={{ color: 'var(--color-ink-soft)', fontWeight: 500 }}>{label}</span>
                                    <span style={{ color, fontWeight: 600, fontFamily: 'DM Mono, monospace', fontSize: 12 }}>{pct}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Últimas ejecuciones */}
            <div className="card animate-fade-up delay-5">
                <div className="card-header">
                    <h3 className="card-title">Últimas Ejecuciones</h3>
                    <Link to="/runs" className="btn btn-outline" style={{ fontSize: 12, padding: '5px 12px' }}>
                        Ver todas
                    </Link>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Inicio</th>
                            <th>Duración</th>
                            <th>Leads</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recent.map(run => (
                            <tr key={run.id}>
                                <td>
                                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-ink-muted)' }}>
                                        {run.id}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 500, color: 'var(--color-ink)' }}>{run.nombre}</td>
                                <td><StatusBadge estado={run.estado} /></td>
                                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 12 }}>{run.inicio}</td>
                                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 12 }}>{run.duracion}</td>
                                <td>
                                    {run.leads > 0
                                        ? <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--color-primary-500)' }}>{run.leads}</span>
                                        : <span style={{ color: 'var(--color-ink-muted)' }}>—</span>
                                    }
                                </td>
                                <td>
                                    <Link to={`/runs/${run.id}`} className="btn btn-outline" style={{ fontSize: 11, padding: '4px 10px' }}>
                                        Ver
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