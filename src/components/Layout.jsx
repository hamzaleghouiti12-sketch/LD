import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, Play, AlertTriangle, Users,
    Settings, Bell, Search, HelpCircle, Zap
} from 'lucide-react'
import '../App.css'

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: Play, label: 'Ejecuciones', to: '/runs' },
    { icon: AlertTriangle, label: 'Errores', to: '/errors' },
    { icon: Users, label: 'Leads', to: '/leads' },
]

const sidebarBottom = [
    { icon: HelpCircle, label: 'Ayuda' },
    { icon: Settings, label: 'Ajustes' },
]

const topLinks = [
    { label: 'Dashboard', to: '/' },
    { label: 'Ejecuciones', to: '/runs' },
    { label: 'Errores', to: '/errors' },
    { label: 'Leads', to: '/leads' },
]

export default function Layout() {
    const location = useLocation()

    return (
        <div className="app-shell">
            {/* Sidebar vertical */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <Zap size={16} color="white" />
                </div>

                <nav className="sidebar-nav">
                    {sidebarItems.map(({ icon: Icon, label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
                        >
                            <Icon size={18} />
                            <span className="tooltip">{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '0 10px 8px' }}>
                    <div className="sidebar-divider" />
                    {sidebarBottom.map(({ icon: Icon, label }) => (
                        <button key={label} className="sidebar-item">
                            <Icon size={18} />
                            <span className="tooltip">{label}</span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main */}
            <div className="main-content">
                {/* Topbar */}
                <header className="topbar">
                    <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--color-ink)', whiteSpace: 'nowrap' }}>
                        LEED
                        <span style={{ color: 'var(--color-primary-500)', marginLeft: 1 }}>·</span>
                    </span>

                    <nav className="topbar-nav">
                        {topLinks.map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) => `topbar-link${isActive ? ' active' : ''}`}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="topbar-actions">
                        <button className="icon-btn"><Search size={15} /></button>
                        <button className="icon-btn"><Bell size={15} /></button>
                        <div className="avatar">AG</div>
                    </div>
                </header>

                {/* Página activa */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}