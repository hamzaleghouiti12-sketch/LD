import { useState } from 'react'
import { errors } from '../data/mockData'
import { AlertTriangle, AlertOctagon } from 'lucide-react'

export default function Errors() {
    const [filtro, setFiltro] = useState("todos")
    // mockData uses `critico` (boolean); derive gravedad: true → "alta", false → "baja"
    const erroresFiltrados = filtro === "todos"
        ? errors
        : errors.filter(e => (e.critico ? "alta" : "baja") === filtro)
    return (
        <div className="page-container">
            <div className="page-header animate-fade-up">
                <h1 className="page-title">Historial de Errores</h1>
                <p className="page-subtitle">Fallos detectados en automatizaciones · Últimos 7 días</p>
            </div>

            {/* Banner crítico */}
            {errors.some(e => e.critico) && (
                <div className="animate-fade-up delay-1" style={{
                    background: 'rgba(239,68,68,0.06)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 12,
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 20,
                }}>
                    <AlertOctagon size={16} color="#dc2626" />
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: '#dc2626' }}>
                        {errors.filter(e => e.critico).length} error{errors.filter(e => e.critico).length > 1 ? 'es' : ''} crítico{errors.filter(e => e.critico).length > 1 ? 's' : ''} requieren atención inmediata
                    </span>
                </div>
            )}

            <div className="animate-fade-up delay-2" style={{ marginBottom: 12 }}>
                <select
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                    className="border border-gray-300 rounded-lg text-sm px-3 py-1.5"
                >
                    <option value="todos">Todos</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                </select>
            </div>

            <div className="card animate-fade-up delay-2">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID Error</th>
                            <th>Run</th>
                            <th>Tipo</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                            <th>Severidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {erroresFiltrados.map(err => (
                            <tr key={err.id}>
                                <td>
                                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-ink-muted)' }}>
                                        {err.id}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--color-primary-500)', fontWeight: 500 }}>
                                        {err.run}
                                    </span>
                                </td>
                                <td>
                                    <span className="chip">{err.tipo}</span>
                                </td>
                                <td style={{ color: 'var(--color-ink-soft)', maxWidth: 260 }}>{err.mensaje}</td>
                                <td style={{ fontFamily: 'DM Mono, monospace', fontSize: 12 }}>{err.fecha}</td>
                                <td>
                                    {err.critico ? (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: '#dc2626', background: 'rgba(239,68,68,0.1)', padding: '3px 9px', borderRadius: 99 }}>
                                            <AlertOctagon size={10} /> Crítico
                                        </span>
                                    ) : (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: '#d97706', background: 'rgba(245,158,11,0.1)', padding: '3px 9px', borderRadius: 99 }}>
                                            <AlertTriangle size={10} /> Medio
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}