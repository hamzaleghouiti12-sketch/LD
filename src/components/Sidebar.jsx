// ─────────────────────────────────────────────
// Sidebar.jsx — Icon-only navigation sidebar
// ─────────────────────────────────────────────

const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "automatizaciones", icon: "⚡", label: "Automatizaciones" },
    { id: "runs", icon: "▶", label: "Runs" },
    { id: "reportes", icon: "📊", label: "Reportes" },
];

const bottomItems = [
    { id: "notificaciones", icon: "🔔", label: "Notificaciones" },
    { id: "ajustes", icon: "⚙", label: "Ajustes" },
];

export default function Sidebar({ activeItem, onSelect }) {
    return (
        <aside className="flex flex-col items-center justify-between w-16 min-h-screen bg-white border-r border-gray-200 py-6">

            {/* Logo */}
            <div className="flex flex-col items-center gap-8 w-full">
                <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center text-white text-sm font-bold select-none">
                    L
                </div>

                {/* Main nav */}
                <nav className="flex flex-col items-center gap-2 w-full">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            title={item.label}
                            onClick={() => onSelect?.(item.id)}
                            className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors duration-150
                ${activeItem === item.id
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"}
              `}
                        >
                            {item.icon}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Bottom nav */}
            <nav className="flex flex-col items-center gap-2 w-full">
                {bottomItems.map((item) => (
                    <button
                        key={item.id}
                        title={item.label}
                        onClick={() => onSelect?.(item.id)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150"
                    >
                        {item.icon}
                    </button>
                ))}

                {/* Avatar placeholder */}
                <div className="mt-4 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold select-none">
                    U
                </div>
            </nav>

        </aside>
    );
}
