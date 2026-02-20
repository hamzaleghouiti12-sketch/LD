import { leads } from "../data/mockData";
import { User, Building2, Mail, Award, CheckCircle2, Clock } from "lucide-react";

const statusIcons = {
    enriquecido: <CheckCircle2 size={16} className="text-emerald-500" />,
    pendiente: <Clock size={16} className="text-gray-400" />,
};

const statusStyles = {
    enriquecido: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pendiente: "bg-gray-50 text-gray-600 border-gray-100",
};

export default function Leads() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Gestión de Leads</h2>
                <p className="text-sm text-gray-500 font-medium">Listado de prospectos procesados y enriquecidos.</p>
            </div>

            <div className="bg-white border border-orange-100/50 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-orange-50/20 border-b border-orange-100/50">
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Nombre</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Empresa</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] text-center w-40">Lead Score</th>
                            <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100/20">
                        {(leads || []).map((lead) => (
                            <tr key={lead.id} className="hover:bg-orange-50/10 transition-colors duration-150">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{lead.nombre}</p>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <Mail size={12} />
                                                {lead.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                        <Building2 size={14} className="text-gray-400" />
                                        {lead.empresa}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {lead.score ? (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50 text-orange-700 font-extrabold border border-orange-100 shadow-sm">
                                            <Award size={14} className="text-orange-500" />
                                            {lead.score}
                                        </div>
                                    ) : (
                                        <span className="text-[10px] font-extrabold text-gray-300 uppercase tracking-widest">Pending</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`
                    inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider
                    ${statusStyles[lead.estado]}
                  `}>
                                        {statusIcons[lead.estado]}
                                        {lead.estado}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm">
                                    No hay leads registrados en el sistema.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
