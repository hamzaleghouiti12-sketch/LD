import { errors } from "../data/mockData";
import { Link } from "react-router-dom";

const gravedadStyles = {
    alta: "bg-red-50 text-red-700",
    media: "bg-orange-50 text-orange-700",
    baja: "bg-blue-50 text-blue-700",
};

export default function Errors() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* Page header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Registro de Errores</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Listado detallado de fallos y excepciones del sistema.
                </p>
            </div>

            {/* Table card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/60">
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Mensaje</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ejecución</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Gravedad</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {errors.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                                    No se han registrado errores recientemente.
                                </td>
                            </tr>
                        ) : (
                            errors.map((error) => (
                                <tr key={error.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-700">{error.tipo}</td>
                                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={error.mensaje}>
                                        {error.mensaje}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/runs/${error.run_id}`}
                                            className="font-mono text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
                                        >
                                            {error.run_id}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${gravedadStyles[error.gravedad] ?? "bg-gray-100 text-gray-500"}`}>
                                            {error.gravedad}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs">
                                        {new Date(error.fecha).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
