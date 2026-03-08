export const kpis = {
    totalRuns: 1284,
    successRate: 94.2,
    activeLeads: 347,
    errors: 74,
    avgDuration: '2m 38s',
    thisWeek: '+12%',
}

export const runs = [
    { id: 'RUN-001', nombre: 'Scraping LinkedIn B2B', estado: 'completado', inicio: '2025-06-10 09:14', duracion: '3m 12s', pasos: 8, leads: 24 },
    { id: 'RUN-002', nombre: 'Enrichment HubSpot', estado: 'error', inicio: '2025-06-10 10:02', duracion: '1m 04s', pasos: 4, leads: 0 },
    { id: 'RUN-003', nombre: 'Outreach Email Sequence', estado: 'ejecutando', inicio: '2025-06-10 11:30', duracion: '—', pasos: 12, leads: 7 },
    { id: 'RUN-004', nombre: 'Lead Scoring Automation', estado: 'completado', inicio: '2025-06-09 16:45', duracion: '5m 51s', pasos: 6, leads: 55 },
    { id: 'RUN-005', nombre: 'CRM Sync Salesforce', estado: 'pendiente', inicio: '2025-06-10 12:00', duracion: '—', pasos: 5, leads: 0 },
    { id: 'RUN-006', nombre: 'AI Qualifier GPT-4', estado: 'completado', inicio: '2025-06-09 14:22', duracion: '2m 09s', pasos: 9, leads: 31 },
]

export const runSteps = [
    { id: 1, titulo: 'Inicializar conexión API', estado: 'completado', duracion: '0.4s', log: 'Conexión establecida con LinkedIn API v2' },
    { id: 2, titulo: 'Autenticación OAuth 2.0', estado: 'completado', duracion: '0.7s', log: 'Token válido hasta 2025-06-11' },
    { id: 3, titulo: 'Extracción de perfiles (pág. 1–5)', estado: 'completado', duracion: '38.2s', log: '120 perfiles extraídos' },
    { id: 4, titulo: 'Filtro por criterios ICP', estado: 'completado', duracion: '1.1s', log: '24 coincidencias con ICP definido' },
    { id: 5, titulo: 'Enriquecimiento con Clearbit', estado: 'completado', duracion: '12.4s', log: 'Email corporativo obtenido en 22/24' },
    { id: 6, titulo: 'Guardado en base de datos', estado: 'completado', duracion: '0.9s', log: '24 leads insertados en tabla leads' },
    { id: 7, titulo: 'Notificación Slack', estado: 'completado', duracion: '0.3s', log: 'Mensaje enviado a #ops-leed' },
    { id: 8, titulo: 'Finalizar y registrar run', estado: 'completado', duracion: '0.2s', log: 'Run RUN-001 cerrado OK' },
]

export const errors = [
    { id: 'ERR-041', run: 'RUN-002', tipo: 'Auth Error', mensaje: 'Token HubSpot expirado', fecha: '2025-06-10 10:03', critico: true },
    { id: 'ERR-040', run: 'RUN-007', tipo: 'Timeout', mensaje: 'La API de Clearbit no respondió en 30s', fecha: '2025-06-09 18:45', critico: false },
    { id: 'ERR-039', run: 'RUN-005', tipo: 'Rate Limit', mensaje: 'LinkedIn bloqueó petición (429)', fecha: '2025-06-09 14:12', critico: false },
    { id: 'ERR-038', run: 'RUN-003', tipo: 'Parse Error', mensaje: 'Schema JSON inesperado en resp. Salesforce', fecha: '2025-06-08 11:30', critico: true },
    { id: 'ERR-037', run: 'RUN-010', tipo: 'DB Error', mensaje: 'Duplicado en campo email_hash', fecha: '2025-06-07 09:00', critico: false },
]

export const leads = [
    { id: 'L-001', nombre: 'Sara Martínez', empresa: 'Fintech Nova', cargo: 'VP de Ventas', email: 's.martinez@nova.io', score: 94, estado: 'Calificado', fuente: 'LinkedIn' },
    { id: 'L-002', nombre: 'Carlos Ruiz', empresa: 'PropTech Layer', cargo: 'CEO', email: 'carlos@layer.ai', score: 87, estado: 'Contactado', fuente: 'Outreach' },
    { id: 'L-003', nombre: 'Elena Voss', empresa: 'HealthAI GmbH', cargo: 'CTO', email: 'e.voss@healthai.de', score: 81, estado: 'Negociando', fuente: 'LinkedIn' },
    { id: 'L-004', nombre: 'James Park', empresa: 'LogiSync', cargo: 'Head of Ops', email: 'j.park@logisync.com', score: 72, estado: 'Nuevo', fuente: 'Scraping' },
    { id: 'L-005', nombre: 'Amara Diallo', empresa: 'EdTech Africa', cargo: 'CMO', email: 'amara@edtechafrica.com', score: 68, estado: 'Nuevo', fuente: 'LinkedIn' },
    { id: 'L-006', nombre: 'Tomás Herrero', empresa: 'Retail AI', cargo: 'Director TI', email: 't.herrero@retailai.es', score: 91, estado: 'Calificado', fuente: 'CRM' },
]

export const weeklyActivity = [
    { dia: 'Lun', runs: 48, leads: 62, errores: 3 },
    { dia: 'Mar', runs: 72, leads: 88, errores: 5 },
    { dia: 'Mié', runs: 55, leads: 74, errores: 2 },
    { dia: 'Jue', runs: 91, leads: 120, errores: 8 },
    { dia: 'Vie', runs: 63, leads: 95, errores: 4 },
    { dia: 'Sáb', runs: 21, leads: 30, errores: 1 },
    { dia: 'Dom', runs: 14, leads: 18, errores: 0 },
]