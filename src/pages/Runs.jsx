import { runs } from "../data/mockData";
import { Link } from "react-router-dom";
import { PlayCircle, CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react";

const statusIcons = {
    completado: <CheckCircle2 size={16} className="text-emerald-500" />,
    fallido: <XCircle size={16} className="text-red-500" />,
    en_progreso: <PlayCircle size={16} className="text-blue-500 animate-pulse" />,
    pendiente: <Clock size={16} className="text-gray-400" />,
};

const statusStyles = {
    completado: "bg-emerald-50 text-emerald-700 border-emerald-100",
    fallido: "bg-red-50 text-red-700 border-red-100",
    en_progreso: "bg-blue-50 text-blue-700 border-blue-100",
    pendiente: "bg-gray-50 text-gray-600 border-gray-100",
};

export default function Runs() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Ejecuciones (Runs)</h2>
                <p className="text-sm text-gray-500 font-medium">Historial completo de ejecuciones de automatizaciones.</p>
            </div>

            <div className="bg-white border border-orange-100/50 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-orange-50/30 border-b border-orange-100/50">
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] w-32">ID</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Automatización</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100/20">
                        {runs.map((run) => (
                            <tr key={run.id} className="hover:bg-orange-50/20 transition-colors duration-150 group">
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/runs/${run.id}`}
                                        className="group flex items-center gap-2 text-xs font-mono font-bold text-blue-600 bg-blue-50/50 px-2 py-1 rounded-md border border-blue-100 hover:bg-blue-600 hover:text-white transition-all w-fit"
                                    >
                                        {run.id}
                                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700">
                                    {run.automatizacion_id}
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`
                    inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border
                    ${statusStyles[run.estado]}
                  `}>
                                        {statusIcons[run.estado]}
                                        <span className="capitalize">{run.estado.replace("_", " ")}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
