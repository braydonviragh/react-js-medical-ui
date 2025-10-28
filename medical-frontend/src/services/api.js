/**
 * API service - Makes HTTP requests to backend, then uses localStorage
 * This simulates a full-stack application with backend communication
 */

import * as localStorageAPI from './localStorage';

// Determine API base URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, backend serves frontend
  : 'http://localhost:5001/api';  // In development, separate ports

/**
 * Make HTTP request to backend
 */
const makeRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Get all medications from backend, then localStorage
 */
export const getMedications = async () => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest('/medications');
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, get data from localStorage
    return localStorageAPI.getMedications();
  } catch (error) {
    console.error('Failed to fetch medications:', error);
    // Fallback to localStorage only
    return localStorageAPI.getMedications();
  }
};

/**
 * Get medication by ID from backend, then localStorage
 */
export const getMedicationById = async (id) => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest(`/medications/${id}`);
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, get data from localStorage
    return localStorageAPI.getMedicationById(id);
  } catch (error) {
    console.error('Failed to fetch medication:', error);
    // Fallback to localStorage only
    return localStorageAPI.getMedicationById(id);
  }
};

/**
 * Create new medication via backend, then localStorage
 */
export const createMedication = async (medicationData) => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest('/medications', {
      method: 'POST',
      body: JSON.stringify(medicationData),
    });
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, save to localStorage
    return localStorageAPI.createMedication(medicationData);
  } catch (error) {
    console.error('Failed to create medication:', error);
    throw error;
  }
};

/**
 * Update medication via backend, then localStorage
 */
export const updateMedication = async (id, medicationData) => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest(`/medications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(medicationData),
    });
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, update localStorage
    return localStorageAPI.updateMedication(id, medicationData);
  } catch (error) {
    console.error('Failed to update medication:', error);
    throw error;
  }
};

/**
 * Delete medication via backend, then localStorage
 */
export const deleteMedication = async (id) => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest(`/medications/${id}`, {
      method: 'DELETE',
    });
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, delete from localStorage
    return localStorageAPI.deleteMedication(id);
  } catch (error) {
    console.error('Failed to delete medication:', error);
    throw error;
  }
};

/**
 * Get refill alerts from backend, then localStorage
 */
export const getRefillAlerts = async () => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest('/medications/refill-alerts');
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, get data from localStorage
    return localStorageAPI.getRefillAlerts();
  } catch (error) {
    console.error('Failed to fetch refill alerts:', error);
    // Fallback to localStorage only
    return localStorageAPI.getRefillAlerts();
  }
};

/**
 * Record a dose via backend, then localStorage
 */
export const recordDose = async (doseData) => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest('/medications/record-dose', {
      method: 'POST',
      body: JSON.stringify(doseData),
    });
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, save to localStorage
    return localStorageAPI.recordDose(doseData);
  } catch (error) {
    console.error('Failed to record dose:', error);
    throw error;
  }
};

/**
 * Get dose history for a medication via backend, then localStorage
 */
export const getDoseHistory = async (medicationId) => {
  try {
    // First make API request to backend
    const apiResponse = await makeRequest(`/medications/${medicationId}/dose-history`);
    console.log('Backend response:', apiResponse.message);
    
    // If API succeeds, get data from localStorage
    return localStorageAPI.getDoseHistoryByMedication(medicationId);
  } catch (error) {
    console.error('Failed to fetch dose history:', error);
    // Fallback to localStorage only
    return localStorageAPI.getDoseHistoryByMedication(medicationId);
  }
};

