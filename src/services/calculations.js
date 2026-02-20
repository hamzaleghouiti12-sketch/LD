// ─────────────────────────────────────────────
// calculations.js — KPI helper functions
// ─────────────────────────────────────────────

/**
 * Returns the total number of runs.
 * @param {Array} runs - Array of run objects from mockData.js
 * @returns {number}
 */
export function getTotalRuns(runs) {
    return runs.length;
}

/**
 * Returns the success rate as a percentage (0–100).
 * A run is considered successful if estado === "completado".
 * @param {Array} runs - Array of run objects from mockData.js
 * @returns {number} percentage rounded to 1 decimal
 */
export function getSuccessRate(runs) {
    if (runs.length === 0) return 0;
    const completados = runs.filter((run) => run.estado === "completado").length;
    return Math.round((completados / runs.length) * 1000) / 10;
}

/**
 * Returns the total number of steps (pasos).
 * @param {Array} steps - Array of paso objects from mockData.js
 * @returns {number}
 */
export function getTotalSteps(steps) {
    return steps.length;
}
