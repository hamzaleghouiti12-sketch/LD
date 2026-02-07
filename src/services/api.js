import { API_URL, SUPABASE_URL, SUPABASE_ANON_KEY, AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '../config/api.config.js';

// --- Base Fetchers ---
async function apiFetch(path, options = {}) {
    const token = sessionStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(`${API_URL}${path}`, { ...options, headers, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`[apiFetch] HTTP Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        console.warn(`[apiFetch] Fallo en ${path}:`, error.message);
        return null;
    }
}

async function supabaseFetch(path, options = {}) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.warn(`[supabaseFetch] Variables no configuradas para ${path}`);
        return null; // Force fallback
    }

    const headers = { 
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        ...options.headers 
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const fullUrl = `${SUPABASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
        const response = await fetch(fullUrl, { ...options, headers, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        console.warn(`[supabaseFetch] Fallo en ${path}:`, error.message);
        return null;
    }
}

async function airtableFetch(tableName) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null;

    const headers = { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` };
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(url, { headers, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        console.warn(`[airtableFetch] Airtable: tabla ${tableName} falló o no encontrada, revisar nombre exacto:`, error.message);
        return null;
    }
}


// --- Logic Endpoints ---

export async function login(email, password) {
    const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    
    if (data && data.token) return data;
    
    // Auth no se toca, mock-token via fallback
    console.warn('[login] Backend no disponible. Haciendo fallback a mock-token.');
    return { token: 'mock-token' };
}

export async function getRuns() {
    const data = await supabaseFetch('/rest/v1/automation_runs?order=started_at.desc');
    
    if (data) {
        return data.map(row => ({
            id: row.id,
            nombre: row.workflow,
            estado: row.status,
            inicio: row.started_at,
            duracion: row.finished_at || '—',
            pasos: row.pasos || 0, // Fallbacks in case columns aren't filled yet
            leads: row.leads || 0
        }));
    }
    
    // Fallback
    console.warn('[getRuns] Haciendo fallback a mockData.');
    const { runs } = await import('../data/mockData.js');
    return runs;
}

export async function getLeads() {
    // Parallel fetch from Supabase + Airtable
    const [supaRows, airtableRes] = await Promise.all([
        supabaseFetch('/rest/v1/leads?order=created_at.desc'),
        airtableFetch('Leads')
    ]);

    let finalLeads = [];

    // Supabase Mapping
    if (supaRows) {
        finalLeads = finalLeads.concat(supaRows.map(row => ({
            id: row.id,
            nombre: row.name,
            email: row.email,
            empresa: row.company,
            cargo: row.cargo || '—', // Ensure standard shape
            source: row.source,
            estado: row.status,
            createdAt: row.created_at,
            score: row.score || 0
        })));
    }

    // Airtable mapping
    if (airtableRes && airtableRes.records) {
        finalLeads = finalLeads.concat(airtableRes.records.map(rec => ({
            id: `at-${rec.id}`,
            nombre: rec.fields.name || null,
            email: rec.fields.email || null,
            empresa: rec.fields.company || null,
            cargo: rec.fields.cargo || null,
            source: rec.fields.source || null,
            estado: rec.fields.status || null,
            createdAt: rec.createdTime || null,
            score: rec.fields.score || 0
        })));
    }

    // If both failed completely, fallback
    if (!supaRows && (!airtableRes || !airtableRes.records)) {
        console.warn('[getLeads] Haciendo fallback completo a mockData.');
        const { leads } = await import('../data/mockData.js');
        return leads;
    }

    return finalLeads;
}

export async function getErrors() {
    const data = await supabaseFetch('/rest/v1/errors?order=timestamp.desc');
    
    if (data) {
        return data.map(row => ({
            id: row.id,
            run: row.workflow, // Use workflow as the associated run for now
            tipo: row.tipo || 'General Error', 
            mensaje: row.error_message,
            fecha: row.timestamp,
            critico: !!row.critico
        }));
    }

    console.warn('[getErrors] Haciendo fallback a mockData.');
    const { errors } = await import('../data/mockData.js');
    return errors;
}

export async function getWeeklyActivity() {
    const data = await supabaseFetch('/rest/v1/automation_runs?select=started_at,status');
    
    if (data) {
        // We use the same grouping logic expected by calculations/mockData
        // Create an aggregation dictionary by day name (Lun, Mar...)
        const grouped = data.reduce((acc, run) => {
            if (!run.started_at) return acc;
            
            const dayStr = new Date(run.started_at).toLocaleDateString('es-ES', { weekday: 'short' });
            // Capitalize first letter: 'lun' -> 'Lun'
            const day = dayStr.charAt(0).toUpperCase() + dayStr.slice(1);
            
            if (!acc[day]) acc[day] = { dia: day, runs: 0, leads: 0, errores: 0 };
            
            acc[day].runs += 1;
            if (run.status === 'error') acc[day].errores += 1;
            
            return acc;
        }, {});

        // Build array spanning standard week to guarantee chart order
        const weekOrder = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const weeklyResult = weekOrder.map(day => grouped[day] || { dia: day, runs: 0, leads: 0, errores: 0 });
        
        return weeklyResult;
    }

    console.warn('[getWeeklyActivity] Haciendo fallback a mockData.');
    const { weeklyActivity } = await import('../data/mockData.js');
    return weeklyActivity;
}

export async function getRunSteps() {
    // Kept as mock fallback for now, Supabase schema does not have a run_steps table listed in Context
    const { runSteps } = await import('../data/mockData.js');
    return runSteps;
}

export async function triggerRun(automationId) {
    const payload = { 
        workflow: automationId, 
        status: 'pending', 
        started_at: new Date().toISOString() 
    };

    const data = await supabaseFetch('/rest/v1/automation_runs', {
        method: 'POST',
        headers: { 'Prefer': 'return=representation' },
        body: JSON.stringify(payload)
    });
    
    if (data && data.length > 0) {
        return data[0]; // Supabase returns array of inserted records
    }

    // Fallback simulated delay
    console.warn(`[triggerRun] Supabase Fallo. Simulando trigger de ${automationId}`);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1500));
}
