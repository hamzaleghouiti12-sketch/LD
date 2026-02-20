// ─────────────────────────────────────────────
// Sidebar.jsx — Icon-only navigation sidebar
// ─────────────────────────────────────────────
import {
    LayoutDashboard,
    Zap,
    Play,
    AlertCircle,
    Users,
    Bell,
    Settings
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { path: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/runs", icon: <Play size={20} />, label: "Runs" },
    { path: "/errors", icon: <AlertCircle size={20} />, label: "Errors" },
    { path: "/leads", icon: <Users size={20} />, label: "Leads" },
];

const bottomItems = [
    { id: "notificaciones", icon: <Bell size={20} />, label: "Notificaciones" },
    { id: "ajustes", icon: <Settings size={20} />, label: "Ajustes" },
];

export default function Sidebar() {
    const { pathname } = useLocation();
    const getActiveClass = (path) => pathname === path ? "active" : "";
    return (
        <aside className="flex flex-col items-center justify-between w-18 min-h-screen bg-white border-r border-orange-100/50 py-8 shadow-[1px_0_10px_rgba(0,0,0,0.01)]">

            {/* Logo */}
            <div className="flex flex-col items-center gap-10 w-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-lg font-bold select-none shadow-sm">
                    L
                </div>

                {/* Main nav */}
                <nav className="flex flex-col items-center gap-3 w-full">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={item.label}
                            className={`
                w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200
                ${pathname === item.path
                                    ? "bg-primary-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.2)] scale-105"
                                    : "text-gray-400 hover:bg-primary-50 hover:text-primary-600"}
              `}
                        >
                            {item.icon}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Bottom nav */}
            <nav className="flex flex-col items-center gap-3 w-full">
                {bottomItems.map((item) => (
                    <button
                        key={item.id}
                        title={item.label}
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                    >
                        {item.icon}
                    </button>
                ))}

                {/* Avatar placeholder */}
                <div className="mt-4 p-[2px] rounded-full bg-gradient-to-tr from-primary-100 to-primary-200 cursor-pointer hover:shadow-sm transition-shadow">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-600 text-sm font-semibold select-none">
                        U
                    </div>
                </div>
            </nav>

        </aside>
    );
}
