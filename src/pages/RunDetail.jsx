import { useParams, Link } from "react-router-dom";
import { runs, pasos } from "../data/mockData";
import {
    ArrowLeft,
    Clock,
    Calendar,
    Info,
    CheckCircle2,
    XCircle,
    CircleDashed
} from "lucide-react";

const stepIcons = {
    ok: <CheckCircle2 size={16} className="text-emerald-500" />,
    error: <XCircle size={16} className="text-red-500" />,
    omitido: <CircleDashed size={16} className="text-gray-300" />,
};

export default function RunDetail() {
    const { id } = useParams();
    const run = runs.find((r) => r.id === id);
    const runSteps = pasos
        .filter((p) => p.run_id === id)
        .sort((a, b) => a.orden - b.orden);

    if (!run) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <p className="text-gray-500 font-medium">No se encontró la ejecución solicitada.</p>
                <Link to="/runs" className="text-sm font-bold text-blue-600 hover:underline">Volver al listado</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">

            {/* Header & Back Action */}
            <div className="flex flex-col gap-6">
                <Link
                    to="/runs"
                    className="group inline-flex items-center gap-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] hover:text-primary-600 transition-colors"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Volver a Ejecuciones
                </Link>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Detalle de Ejecución</h2>
                        <p className="text-[10px] font-mono font-bold text-primary-500/70">{run.id}</p>
                    </div>
                    <div className="px-4 py-2 bg-white border border-orange-100/50 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)]">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mr-2 border-r border-orange-50 pr-2">Estado</span>
                        <span className="text-xs font-black text-gray-800 capitalize tracking-wide pl-1">{run.estado.replace("_", " ")}</span>
                    </div>
                </div>
            </div>

            {/* Run Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-orange-100/50 rounded-2xl shadow-[0_4px_15px_-5px_rgba(0,0,0,0.02)] space-y-3">
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="p-1.5 bg-orange-50 text-orange-500 rounded-md"><Info size={14} /></div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest">Automatización</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg tracking-tight">{run.automatizacion_id}</p>
                </div>
                <div className="p-6 bg-white border border-orange-100/50 rounded-2xl shadow-[0_4px_15px_-5px_rgba(0,0,0,0.02)] space-y-3">
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="p-1.5 bg-orange-50 text-orange-500 rounded-md"><Calendar size={14} /></div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest">Inicio</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg tracking-tight">{run.inicio ? new Date(run.inicio).toLocaleString() : "Pendiente"}</p>
                </div>
                <div className="p-6 bg-white border border-orange-100/50 rounded-2xl shadow-[0_4px_15px_-5px_rgba(0,0,0,0.02)] space-y-3">
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="p-1.5 bg-orange-50 text-orange-500 rounded-md"><Clock size={14} /></div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest">Duración</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg tracking-tight">{run.duracion_seg ? `${run.duracion_seg}s` : "N/A"}</p>
                </div>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Pasos de la Ejecución</h3>
                <div className="bg-white border border-orange-100/40 rounded-3xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.02)] divide-y divide-orange-50 overflow-hidden">
                    {runSteps.map((paso) => (
                        <div key={paso.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-gray-300 w-4">{paso.orden}</span>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-gray-800">{paso.nombre}</p>
                                    {paso.mensaje && <p className="text-xs text-gray-400">{paso.mensaje}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {paso.duracion_seg && <span className="text-xs font-medium text-gray-400">{paso.duracion_seg}s</span>}
                                <div className="flex items-center gap-2">
                                    {stepIcons[paso.estado]}
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{paso.estado}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {runSteps.length === 0 && (
                        <div className="p-10 text-center text-gray-400 text-sm">No hay pasos registrados para esta ejecución.</div>
                    )}
                </div>
            </div>

        </div>
    );
}
