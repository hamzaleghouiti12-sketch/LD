import { runs } from "../data/mockData";
import { getTotalRuns, getSuccessRate } from "../services/calculations";
import { Activity, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
    const totalRuns = getTotalRuns(runs);
    const successRate = getSuccessRate(runs);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Panel de Control</h2>
                <p className="text-sm text-gray-500 font-medium">Resumen general del estado de tus automatizaciones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Runs Card */}
                <div className="p-6 bg-white border border-orange-100/50 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Total de Ejecuciones</p>
                            <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{totalRuns}</h3>
                        </div>
                        <div className="p-3 bg-primary-50 text-primary-500 rounded-xl group-hover:scale-110 transition-transform">
                            <Activity size={24} />
                        </div>
                    </div>
                    <div className="mt-5 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full w-full opacity-80" />
                    </div>
                </div>

                {/* Success Rate Card */}
                <div className="p-6 bg-white border border-orange-100/50 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Tasa de Éxito</p>
                            <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">{successRate}%</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={24} />
                        </div>
                    </div>
                    <div className="mt-5 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                            style={{ width: `${successRate}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
