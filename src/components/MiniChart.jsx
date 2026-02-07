/**
 * MiniChart — SVG bar chart, zero dependencies.
 * Props: data = [{ dia, runs, leads, errores }]
 */
export default function MiniChart({ data = [] }) {
    if (!data.length) return null

    const W = 600          // SVG viewport width
    const H = 110          // bar area height
    const BOTTOM = 24      // space for day labels
    const SVG_H = H + BOTTOM
    const cols = ['runs', 'leads', 'errores']
    const colors = ['var(--color-ink)', 'var(--color-primary-400)', 'rgba(239,68,68,0.55)']

    // global max across all series
    const max = Math.max(...data.flatMap(d => cols.map(k => d[k] || 0)), 1)

    const n = data.length
    const colW = W / n          // width per day slot
    const barW = colW / (cols.length + 1.2)  // individual bar width
    const gap = barW * 0.3      // gap between bars in same group
    const radius = 3

    // tooltip state – purely via SVG title elements (no React state needed)
    return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
            <svg
                viewBox={`0 0 ${W} ${SVG_H}`}
                width="100%"
                height={140}
                style={{ display: 'block' }}
                aria-label="Actividad semanal"
            >
                {data.map((d, i) => {
                    const slotX = i * colW
                    const groupW = cols.length * barW + (cols.length - 1) * gap
                    const startX = slotX + (colW - groupW) / 2

                    return (
                        <g key={d.dia}>
                            {/* Day label */}
                            <text
                                x={slotX + colW / 2}
                                y={SVG_H - 4}
                                textAnchor="middle"
                                fontSize={11}
                                fill="var(--color-ink-muted)"
                                fontFamily="DM Sans, sans-serif"
                            >
                                {d.dia}
                            </text>

                            {/* Bars */}
                            {cols.map((col, ci) => {
                                const val = d[col] || 0
                                const barH = Math.max((val / max) * H, val > 0 ? 4 : 0)
                                const x = startX + ci * (barW + gap)
                                const y = H - barH

                                return (
                                    <g key={col}>
                                        <rect
                                            x={x}
                                            y={y}
                                            width={barW}
                                            height={barH}
                                            fill={colors[ci]}
                                            rx={radius}
                                            ry={radius}
                                        />
                                        <title>{`${d.dia} · ${col}: ${val}`}</title>
                                    </g>
                                )
                            })}
                        </g>
                    )
                })}
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 14, marginTop: 6, paddingLeft: 4 }}>
                {[
                    { label: 'Runs', color: 'var(--color-ink)' },
                    { label: 'Leads', color: 'var(--color-primary-400)' },
                    { label: 'Errores', color: 'rgba(239,68,68,0.55)' },
                ].map(({ label, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-ink-muted)' }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: 'inline-block', flexShrink: 0 }} />
                        {label}
                    </div>
                ))}
            </div>
        </div>
    )
}