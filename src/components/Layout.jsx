// ─────────────────────────────────────────────
// Layout.jsx — Base shell: Sidebar + Main area
// ─────────────────────────────────────────────
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const [activeItem, setActiveItem] = useState("dashboard");

    return (
        <div className="flex min-h-screen bg-cream">

            {/* ── Sidebar ── */}
            <Sidebar activeItem={activeItem} onSelect={setActiveItem} />

            {/* ── Main content area ── */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Top bar */}
                <header className="h-14 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-orange-100/30 shadow-[0_1px_4px_rgba(0,0,0,0.01)]">
                    <h1 className="text-sm font-bold text-gray-800 capitalize tracking-wide">
                        {activeItem}
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
