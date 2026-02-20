// ─────────────────────────────────────────────
// Layout.jsx — Base shell: Sidebar + Main area
// ─────────────────────────────────────────────
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const getPageTitle = (pathname) => {
    const titles = {
        "/": "Dashboard",
        "/runs": "Ejecuciones",
        "/errors": "Errores",
        "/leads": "Leads",
    };
    return titles[pathname] || "Dashboard";
};

export default function Layout({ children }) {
    const { pathname } = useLocation();
    const pageTitle = getPageTitle(pathname);

    return (
        <div className="flex min-h-screen bg-cream">

            {/* ── Sidebar ── */}
            <Sidebar />

            {/* ── Main content area ── */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Top bar */}
                <header className="h-14 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-orange-100/30 shadow-[0_1px_4px_rgba(0,0,0,0.01)]">
                    <h1 className="text-sm font-bold text-gray-800 capitalize tracking-wide">
                        {pageTitle}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest">Live System</span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}
