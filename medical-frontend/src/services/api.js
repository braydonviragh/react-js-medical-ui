/**
 * API service - Now uses localStorage instead of backend API
 * All data is stored in the browser's localStorage
 */

import * as localStorageAPI from './localStorage';

/**
 * Get all medications from localStorage
 */
export const getMedications = async () => {
  return localStorageAPI.getMedications();
};

/**
 * Get medication by ID from localStorage
 */
export const getMedicationById = async (id) => {
  return localStorageAPI.getMedicationById(id);
};

/**
 * Create new medication in localStorage
 */
export const createMedication = async (medicationData) => {
  return localStorageAPI.createMedication(medicationData);
};

/**
 * Update medication in localStorage
 */
export const updateMedication = async (id, medicationData) => {
  return localStorageAPI.updateMedication(id, medicationData);
};

/**
 * Delete medication from localStorage
 */
export const deleteMedication = async (id) => {
  return localStorageAPI.deleteMedication(id);
};

/**
 * Get refill alerts from localStorage
 */
export const getRefillAlerts = async () => {
  return localStorageAPI.getRefillAlerts();
};

/**
 * Record a dose in localStorage
 */
export const recordDose = async (doseData) => {
  return localStorageAPI.recordDose(doseData);
};

/**
 * Get dose history for a medication from localStorage
 */
export const getDoseHistory = async (medicationId) => {
  return localStorageAPI.getDoseHistoryByMedication(medicationId);
};

