import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'

export default function MiniChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={140}>
            <BarChart data={data} barGap={4}>
                <XAxis
                    dataKey="dia"
                    tick={{ fontSize: 11, fill: 'var(--color-ink-muted)', fontFamily: 'DM Sans' }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    contentStyle={{
                        background: 'var(--color-ink)',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 12,
                        color: 'white',
                        fontFamily: 'DM Mono, monospace',
                    }}
                    cursor={{ fill: 'rgba(249,115,22,0.05)' }}
                />
                <Bar dataKey="runs" fill="var(--color-ink)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leads" fill="var(--color-primary-400)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="errores" fill="rgba(239,68,68,0.5)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}