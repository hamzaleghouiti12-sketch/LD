import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import { useAutomationData } from '../hooks/useAutomationData.js'
import { triggerRun } from '../services/api.js'
import { Play } from 'lucide-react'

const ESTADOS = [
    { valor: 'todos', etiqueta: 'Todos' },
    { valor: 'completado', etiqueta: 'Completado' },
    { valor: 'error', etiqueta: 'Error' },
    { valor: 'ejecutando', etiqueta: 'En Progreso' },
    { valor: 'pendiente', etiqueta: 'Pendiente' },
]

export default function Runs() {
    const { runs, loading, refresh } = useAutomationData()
    const [filtro, setFiltro] = useState('todos')
    const [modal, setModal] = useState({ open: false, runNombre: '' })
    const [triggering, setTriggering] = useState(false)
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

    // Cerrar modal con Escape
    useEffect(() => {
        if (!modal.open) return
        const onKey = (e) => { if (e.key === 'Escape' && !triggering) setModal({ open: false, runNombre: '' }) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [modal.open, triggering])

    // Ocultar toast automáticamente tras 3 segundos
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => setToast(t => ({ ...t, show: false })), 3000)
            return () => clearTimeout(timer)
        }
    }, [toast.show])

    if (loading) {
        return (
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--color-ink-muted)', fontSize: 13 }}>
                    Cargando datos…
                </div>
            </div>
        )
    }

    const runsVisibles = filtro === 'todos' ? runs : runs.filter(r => r.estado === filtro)

    const abrirModal = () => {
        // Abre el modal con el nombre de la primera automatización disponible
        const nombre = runs.length > 0 ? runs[0].nombre : 'Nueva Automatización'
        setModal({ open: true, runNombre: nombre })
    }

    const confirmarRun = async () => {
        setTriggering(true)
        try {
            await triggerRun(modal.runNombre)
            setToast({ show: true, message: `Run disparado: ${modal.runNombre}`, type: 'success' })
            if (refresh) refresh()
        } catch (error) {
            setToast({ show: true, message: `Error al lanzar: ${modal.runNombre}`, type: 'error' })
        } finally {
            setTriggering(false)
            setModal({ open: false, runNombre: '' })
        }
    }

    return (
        <div className="page-container">
            <div className="page-header animate-fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 className="page-title">Ejecuciones</h1>
                    <p className="page-subtitle">Historial completo de automatizaciones ejecutadas</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-orange" onClick={abrirModal}><Play size={14} /> Nuevo Run</button>
                </div>
            </div>

            {/* Filtros por estado */}
            <div className="animate-fade-up" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {ESTADOS.map(e => (
                    <button
                        key={e.valor}
                        className={`btn ${filtro === e.valor ? 'btn-primary' : 'btn-outline'}`}
                        style={{ fontSize: 12, padding: '5px 12px' }}
                        onClick={() => setFiltro(e.valor)}
                    >
                        {e.etiqueta}
                    </button>
                ))}
            </div>

            {/* Contador */}
            <p className="page-subtitle animate-fade-up" style={{ marginBottom: 10 }}>
                Mostrando {runsVisibles.length} de {runs.length} ejecuciones
            </p>

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
                        {runsVisibles.map((run, i) => (
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

            {/* Modal Nuevo Run */}
            {modal.open && (
                <div
                    onClick={() => setModal({ open: false, runNombre: '' })}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        zIndex: 200,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <div
                        className="card"
                        onClick={e => e.stopPropagation()}
                        style={{ width: 380, maxWidth: '90vw' }}
                    >
                        <div className="card-header" style={{ justifyContent: 'space-between' }}>
                            <h3 className="card-title">Nuevo Run</h3>
                            <button
                                className="btn btn-outline"
                                style={{ padding: '3px 8px', fontSize: 13 }}
                                onClick={() => setModal({ open: false, runNombre: '' })}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <p style={{ fontSize: 13, color: 'var(--color-ink-muted)', margin: 0 }}>
                                ¿Confirmas lanzar la siguiente automatización?
                            </p>
                            <div style={{
                                background: 'var(--color-cream-dark)',
                                borderRadius: 10,
                                padding: '10px 14px',
                                fontWeight: 600,
                                fontSize: 13.5,
                                color: 'var(--color-ink)',
                            }}>
                                {modal.runNombre}
                            </div>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setModal({ open: false, runNombre: '' })}
                                    disabled={triggering}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    className="btn btn-orange" 
                                    onClick={confirmarRun}
                                    disabled={triggering}
                                    style={{ minWidth: 104, justifyContent: 'center' }}
                                >
                                    {triggering ? (
                                        <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                    ) : (
                                        <><Play size={13} /> Confirmar</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast feedback CSS */}
            {toast.show && (
                <div style={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 300,
                    background: toast.type === 'success' ? '#16a34a' : '#dc2626',
                    color: 'white', padding: '12px 20px', borderRadius: 10,
                    fontSize: 13.5, fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    animation: 'fade-up 0.3s ease-out'
                }}>
                    {toast.message}
                </div>
            )}
            
            <style>{`
                @keyframes spin { 
                    to { transform: rotate(360deg); } 
                }
            `}</style>
        </div>
    )
}