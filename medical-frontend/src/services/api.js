/**
 * API service for communicating with the backend
 */

// In production (served by backend), use relative URL
// In development, use localhost backend
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get all medications
 */
export const getMedications = async () => {
  return fetchAPI('/medications');
};

/**
 * Get medication by ID
 */
export const getMedicationById = async (id) => {
  return fetchAPI(`/medications/${id}`);
};

/**
 * Create new medication
 */
export const createMedication = async (medicationData) => {
  return fetchAPI('/medications', {
    method: 'POST',
    body: JSON.stringify(medicationData),
  });
};

/**
 * Update medication
 */
export const updateMedication = async (id, medicationData) => {
  return fetchAPI(`/medications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(medicationData),
  });
};

/**
 * Delete medication
 */
export const deleteMedication = async (id) => {
  return fetchAPI(`/medications/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Get refill alerts
 */
export const getRefillAlerts = async () => {
  return fetchAPI('/refill-alerts');
};

/**
 * Record a dose
 */
export const recordDose = async (doseData) => {
  return fetchAPI('/doses', {
    method: 'POST',
    body: JSON.stringify(doseData),
  });
};

/**
 * Get dose history for a medication
 */
export const getDoseHistory = async (medicationId) => {
  return fetchAPI(`/medications/${medicationId}/doses`);
};

