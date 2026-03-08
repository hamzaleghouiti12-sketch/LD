export default function KpiCard({ icon, iconBg, value, label, badge, badgeType = 'up', delay = '' }) {
    return (
        <div className={`kpi-card animate-fade-up ${delay}`}>
            <div className="kpi-icon" style={{ background: iconBg }}>
                {icon}
            </div>
            <div className="kpi-value">{value}</div>
            <div className="kpi-label">{label}</div>
            {badge && (
                <div className={`kpi-badge ${badgeType}`}>
                    {badgeType === 'up' ? '↑' : '↓'} {badge}
                </div>
            )}
        </div>
    )
}