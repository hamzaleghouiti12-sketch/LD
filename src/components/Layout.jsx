// ─────────────────────────────────────────────
// Layout.jsx — Base shell: Sidebar + Main area
// ─────────────────────────────────────────────
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const [activeItem, setActiveItem] = useState("dashboard");

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* ── Sidebar ── */}
            <Sidebar activeItem={activeItem} onSelect={setActiveItem} />

            {/* ── Main content area ── */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Top bar */}
                <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-200">
                    <h1 className="text-sm font-semibold text-gray-700 capitalize tracking-wide">
                        {activeItem}
                    </h1>
                    <span className="text-xs text-gray-400">LEED Dashboard</span>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}
