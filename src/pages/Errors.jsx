import { errors } from "../data/mockData";
import { AlertCircle, ShieldAlert, ShieldInfo, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const severityIcons = {
    alta: <ShieldAlert size={16} className="text-red-500" />,
    media: <AlertCircle size={16} className="text-orange-500" />,
    baja: <ShieldInfo size={16} className="text-blue-500" />,
};

const severityStyles = {
    alta: "bg-red-50 text-red-700 border-red-100",
    media: "bg-orange-50 text-orange-700 border-orange-100",
    baja: "bg-blue-50 text-blue-700 border-blue-100",
};

export default function Errors() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Registro de Errores</h2>
                <p className="text-sm text-gray-500 font-medium">Listado detallado de fallos y excepciones del sistema.</p>
            </div>

            <div className="bg-white border border-orange-100/50 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-orange-50/20 border-b border-orange-100/50">
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Tipo</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Mensaje</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Ejecución</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Gravedad</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100/20">
                        {errors.map((error) => (
                            <tr key={error.id} className="hover:bg-orange-50/10 transition-colors duration-150">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-gray-700">{error.tipo}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-500 max-w-md truncate" title={error.mensaje}>
                                        {error.mensaje}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/runs/${error.run_id}`}
                                        className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-100/50 hover:bg-primary-500 hover:text-white transition-all shadow-sm"
                                    >
                                        {error.run_id}
                                        <ExternalLink size={10} />
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`
                    inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider
                    ${severityStyles[error.gravedad]}
                  `}>
                                        {severityIcons[error.gravedad]}
                                        {error.gravedad}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {errors.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm">
                                    No se han registrado errores recientemente.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
