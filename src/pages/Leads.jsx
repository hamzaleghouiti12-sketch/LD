import { leads } from "../data/mockData";

const estadoStyles = {
    enriquecido: "bg-emerald-50 text-emerald-700",
    pendiente: "bg-gray-100 text-gray-500",
};

export default function Leads() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* Page header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Gestión de Leads</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Listado de prospectos procesados y enriquecidos.
                </p>
            </div>

            {/* Table card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/60">
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Empresa</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Lead Score</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                                    No hay leads registrados en el sistema.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-800">{lead.nombre}</td>
                                    <td className="px-6 py-4 text-gray-600">{lead.empresa}</td>
                                    <td className="px-6 py-4 text-gray-500">{lead.email}</td>
                                    <td className="px-6 py-4">
                                        {lead.score != null ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-50 text-primary-700">
                                                {lead.score}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-300 font-medium">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${estadoStyles[lead.estado] ?? "bg-gray-100 text-gray-500"}`}>
                                            {lead.estado}
                                        </span>
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
