import { runs } from "../data/mockData";
import { Link } from "react-router-dom";

const estadoStyles = {
    completado: "bg-emerald-50 text-emerald-700",
    fallido: "bg-red-50 text-red-700",
    en_progreso: "bg-blue-50 text-blue-700",
    pendiente: "bg-gray-100 text-gray-500",
};

export default function Runs() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* Page header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Ejecuciones</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Historial completo de ejecuciones de automatizaciones.
                </p>
            </div>

            {/* Table card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/60">
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Automatización</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {runs.map((run) => (
                            <tr key={run.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/runs/${run.id}`}
                                        className="font-mono text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
                                    >
                                        {run.id}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-gray-700 font-medium">{run.automatizacion_id}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${estadoStyles[run.estado] ?? "bg-gray-100 text-gray-500"}`}>
                                        {run.estado.replace("_", " ")}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
