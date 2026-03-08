// api.js — Data access layer.
// Cuando el backend esté listo, reemplaza cada dynamic import con:
// return fetch(import.meta.env.VITE_API_URL + '/endpoint').then(r => r.json())

export async function getRuns() {
  const { runs } = await import('../data/mockData.js');
  return runs;
}

export async function getLeads() {
  const { leads } = await import('../data/mockData.js');
  return leads;
}

export async function getErrors() {
  const { errors } = await import('../data/mockData.js');
  return errors;
}

export async function getWeeklyActivity() {
  const { weeklyActivity } = await import('../data/mockData.js');
  return weeklyActivity;
}
