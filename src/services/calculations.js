export function calcSuccessRate(runs) {
    if (!runs || runs.length === 0) return 0
    const ok = runs.filter(r => r.estado === 'completado').length
    return Math.round((ok / runs.length) * 100 * 10) / 10
}

export function calcTotalLeads(runs) {
    return runs.reduce((sum, r) => sum + (r.leads || 0), 0)
}

export function calcErrorCount(runs) {
    return runs.filter(r => r.estado === 'error').length
}

export function groupByWeek(runs) {
    // Agrupa runs por día de la semana (mockeable)
    return runs.reduce((acc, run) => {
        const day = new Date(run.inicio).toLocaleDateString('es-ES', { weekday: 'short' })
        acc[day] = (acc[day] || 0) + 1
        return acc
    }, {})
}

export function calcAvgDuration(runs) {
    const withDuration = runs.filter(r => r.duracion && r.duracion !== '—')
    if (!withDuration.length) return '—'
    const toSeconds = (d) => {
        const [m, s] = d.replace('m', '').replace('s', '').split(' ')
        return parseInt(m) * 60 + parseInt(s)
    }
    const avg = withDuration.reduce((s, r) => s + toSeconds(r.duracion), 0) / withDuration.length
    const m = Math.floor(avg / 60)
    const s = Math.round(avg % 60)
    return `${m}m ${s}s`
}