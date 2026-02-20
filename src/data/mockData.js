// ─────────────────────────────────────────────
// MOCK DATA — LEED Dashboard
// Scope: automatizaciones, runs, pasos, errors, leads
// ─────────────────────────────────────────────

export const automatizaciones = [
    {
        id: "auto-001",
        nombre: "Enriquecimiento de Leads",
        descripcion: "Valida y enriquece los datos de leads entrantes.",
        estado: "activa",        // activa | pausada | error
        creada_en: "2026-01-10T09:00:00Z",
    },
    {
        id: "auto-002",
        nombre: "Clasificación de Documentos",
        descripcion: "Clasifica documentos según tipo y prioridad.",
        estado: "pausada",
        creada_en: "2026-01-20T14:30:00Z",
    },
];

export const runs = [
    {
        id: "run-001",
        automatizacion_id: "auto-001",
        estado: "completado",    // completado | en_progreso | fallido | pendiente
        inicio: "2026-02-19T08:00:00Z",
        fin: "2026-02-19T08:03:42Z",
        duracion_seg: 222,
    },
    {
        id: "run-002",
        automatizacion_id: "auto-001",
        estado: "fallido",
        inicio: "2026-02-19T09:15:00Z",
        fin: "2026-02-19T09:15:58Z",
        duracion_seg: 58,
    },
    {
        id: "run-003",
        automatizacion_id: "auto-001",
        estado: "en_progreso",
        inicio: "2026-02-19T10:30:00Z",
        fin: null,
        duracion_seg: null,
    },
    {
        id: "run-004",
        automatizacion_id: "auto-002",
        estado: "completado",
        inicio: "2026-02-18T14:00:00Z",
        fin: "2026-02-18T14:07:10Z",
        duracion_seg: 430,
    },
    {
        id: "run-005",
        automatizacion_id: "auto-002",
        estado: "pendiente",
        inicio: null,
        fin: null,
        duracion_seg: null,
    },
];

export const pasos = [
    // run-001
    {
        id: "paso-001",
        run_id: "run-001",
        nombre: "Verificar email",
        estado: "ok",            // ok | error | omitido
        orden: 1,
        duracion_seg: 12,
        mensaje: null,
    },
    {
        id: "paso-002",
        run_id: "run-001",
        nombre: "Enriquecer con API",
        estado: "ok",
        orden: 2,
        duracion_seg: 210,
        mensaje: null,
    },
    // run-002
    {
        id: "paso-003",
        run_id: "run-002",
        nombre: "Verificar email",
        estado: "ok",
        orden: 1,
        duracion_seg: 8,
        mensaje: null,
    },
    {
        id: "paso-004",
        run_id: "run-002",
        nombre: "Enriquecer con API",
        estado: "error",
        orden: 2,
        duracion_seg: 50,
        mensaje: "Timeout al conectar con la API externa.",
    },
    // run-003
    {
        id: "paso-005",
        run_id: "run-003",
        nombre: "Verificar email",
        estado: "ok",
        orden: 1,
        duracion_seg: 9,
        mensaje: null,
    },
    {
        id: "paso-006",
        run_id: "run-003",
        nombre: "Enriquecer con API",
        estado: "omitido",
        orden: 2,
        duracion_seg: null,
        mensaje: "En espera de respuesta.",
    },
    // run-004
    {
        id: "paso-007",
        run_id: "run-004",
        nombre: "Clasificar documento",
        estado: "ok",
        orden: 1,
        duracion_seg: 30,
        mensaje: null,
    },
    {
        id: "paso-008",
        run_id: "run-004",
        nombre: "Asignar prioridad",
        estado: "ok",
        orden: 2,
        duracion_seg: 400,
        mensaje: null,
    },
    // run-005
    {
        id: "paso-009",
        run_id: "run-005",
        nombre: "Clasificar documento",
        estado: "omitido",
        orden: 1,
        duracion_seg: null,
        mensaje: "Run pendiente de inicio.",
    },
    {
        id: "paso-010",
        run_id: "run-005",
        nombre: "Asignar prioridad",
        estado: "omitido",
        orden: 2,
        duracion_seg: null,
        mensaje: "Run pendiente de inicio.",
    },
];

export const errors = [
    {
        id: "err-001",
        run_id: "run-002",
        paso_id: "paso-004",
        tipo: "Conectividad",
        mensaje: "Timeout al conectar con la API externa.",
        gravedad: "alta",
        fecha: "2026-02-19T09:15:58Z"
    }
];

export const leads = [
    {
        id: "lead-001",
        nombre: "Juan Perez",
        empresa: "Tech Solutions",
        email: "juan@tech.com",
        score: 85,
        estado: "enriquecido"
    },
    {
        id: "lead-002",
        nombre: "Maria Garcia",
        empresa: "Data Corp",
        email: "m.garcia@datacorp.io",
        score: null,
        estado: "pendiente"
    }
];
