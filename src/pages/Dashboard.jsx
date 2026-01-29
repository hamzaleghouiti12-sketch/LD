import { runs, leads } from "../data/mockData";
import {
    getTotalRuns,
    getSuccessRate,
    getFailedRunsCount,
    getProcessedLeadsCount,
} from "../services/calculations";

export default function Dashboard() {
    const totalRuns = getTotalRuns(runs);
    const successRate = getSuccessRate(runs);
    const failedRuns = getFailedRunsCount(runs);
    const processedLeads = getProcessedLeadsCount(leads);

    return (
        <div className="max-w-5xl mx-auto space-y-8">

            {/* Page header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Panel de Control</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Resumen general del estado de tus automatizaciones.
                </p>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Total Runs */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Total de Ejecuciones
                    </p>
                    <p className="text-4xl font-extrabold text-gray-900">{totalRuns}</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full w-full" />
                    </div>
                </div>

                {/* Success Rate */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Tasa de Éxito
                    </p>
                    <p className="text-4xl font-extrabold text-gray-900">{successRate}%</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                            style={{ width: `${successRate}%` }}
                        />
                    </div>
                </div>

                {/* Failed Runs */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Fallos
                    </p>
                    <p className="text-4xl font-extrabold text-red-600">{failedRuns}</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-400 rounded-full transition-all duration-700"
                            style={{ width: totalRuns > 0 ? `${(failedRuns / totalRuns) * 100}%` : "0%" }}
                        />
                    </div>
                </div>

                {/* Processed Leads */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Leads Procesados
                    </p>
                    <p className="text-4xl font-extrabold text-gray-900">{processedLeads}</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full w-full" />
                    </div>
                </div>

            </div>
        </div>
    );
}
