import { useEffect, useState } from 'react';
import { getRuns, getLeads, getErrors, getWeeklyActivity, getRunSteps } from '../services/api.js';

const POLLING_INTERVAL_MS = 5000;

export function useAutomationData() {
  const [runs, setRuns] = useState([]);
  const [leads, setLeads] = useState([]);
  const [errors, setErrors] = useState([]);
  const [runSteps, setRunSteps] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const fetchAll = async () => {
    try {
      const [runsData, leadsData, errorsData, weeklyData, stepsData] = await Promise.all([
        getRuns(),
        getLeads(),
        getErrors(),
        getWeeklyActivity(),
        getRunSteps(),
      ]);
      setRuns(runsData);
      setLeads(leadsData);
      setErrors(errorsData);
      setWeeklyActivity(weeklyData);
      setRunSteps(stepsData);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, POLLING_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return { runs, leads, errors, runSteps, weeklyActivity, loading, fetchError, refresh: fetchAll };
}
