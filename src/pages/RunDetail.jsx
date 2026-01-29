import { useParams, Link } from "react-router-dom";
import { runs, pasos } from "../data/mockData";

const pasoEstadoStyles = {
    ok: "bg-emerald-50 text-emerald-700",
    error: "bg-red-50 text-red-700",
    omitido: "bg-gray-100 text-gray-400",
};

export default function RunDetail() {
    const { id } = useParams();
    const run = runs.find((r) => r.id === id);

    if (!run) {
        return (
            <div className="max-w-5xl mx-auto space-y-4 py-12 text-center">
                <p className="text-gray-500">No se encontró la ejecución solicitada.</p>
                <Link to="/runs" className="text-sm font-semibold text-primary-600 hover:underline">
                    ← Volver al listado
                </Link>
            </div>
        );
    }

    const runSteps = pasos
        .filter((p) => p.run_id === id)
        .sort((a, b) => a.orden - b.orden);

    return (
        <div className="max-w-5xl mx-auto space-y-8">

            {/* Back + header */}
            <div className="space-y-3">
                <Link
                    to="/runs"
                    className="text-xs font-semibold text-gray-400 hover:text-primary-600 transition-colors"
                >
                    ← Volver a Ejecuciones
                </Link>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">Detalle de Ejecución</h2>
                    <span className="font-mono text-xs text-gray-400">{run.id}</span>
                </div>
            </div>

            {/* Run metadata card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    Información del Run
                </h3>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Automatización", value: run.automatizacion_id },
                        { label: "Estado", value: run.estado },
                        { label: "Duración", value: run.duracion_seg ? `${run.duracion_seg}s` : "N/A" },
                        { label: "Inicio", value: run.inicio ? new Date(run.inicio).toLocaleString() : "Pendiente" },
                        { label: "Fin", value: run.fin ? new Date(run.fin).toLocaleString() : "N/A" },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <dt className="text-xs text-gray-400 font-medium mb-0.5">{label}</dt>
                            <dd className="text-sm font-semibold text-gray-800">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* Steps list */}
            <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">Pasos de la Ejecución</h3>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
                    {runSteps.length === 0 ? (
                        <p className="px-6 py-8 text-sm text-center text-gray-400">
                            No hay pasos registrados para esta ejecución.
                        </p>
                    ) : (
                        runSteps.map((paso) => (
                            <div key={paso.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-gray-300 w-4 shrink-0">{paso.orden}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{paso.nombre}</p>
                                        {paso.mensaje && (
                                            <p className="text-xs text-gray-400 mt-0.5">{paso.mensaje}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    {paso.duracion_seg && (
                                        <span className="text-xs text-gray-400">{paso.duracion_seg}s</span>
                                    )}
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${pasoEstadoStyles[paso.estado] ?? "bg-gray-100 text-gray-500"}`}>
                                        {paso.estado}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}
