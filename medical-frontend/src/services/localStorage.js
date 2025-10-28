/**
 * LocalStorage service for medications and dose history
 * This replaces the backend API calls and stores data in the browser's localStorage
 */

const MEDICATIONS_STORAGE_KEY = 'medical_app_medications';
const DOSE_HISTORY_STORAGE_KEY = 'medical_app_dose_history';
const ID_COUNTER_KEY = 'medical_app_id_counter';

/**
 * Initialize and get ID counter
 */
const getNextId = () => {
  let counter = parseInt(localStorage.getItem(ID_COUNTER_KEY) || '0');
  counter++;
  localStorage.setItem(ID_COUNTER_KEY, counter.toString());
  return counter;
};

/**
 * Get dose history for a medication
 */
const getDoseHistory = () => {
  try {
    const data = localStorage.getItem(DOSE_HISTORY_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting dose history:', error);
    return [];
  }
};

/**
 * Calculate adherence percentage for a medication based on dose history
 */
const calculateAdherenceForMedication = (medicationId) => {
  try {
    const doseHistory = getDoseHistory();
    const medicationDoses = doseHistory.filter(dose => dose.medicationId === parseInt(medicationId));
    
    const takenDoses = medicationDoses.filter(dose => dose.status === 'taken').length;
    const missedDoses = medicationDoses.filter(dose => dose.status === 'missed').length;
    const totalDoses = takenDoses + missedDoses;
    
    if (totalDoses === 0) return { takenDoses: 0, missedDoses: 0, adherencePercentage: 0 };
    
    const adherencePercentage = Math.round((takenDoses / totalDoses) * 100);
    return { takenDoses, missedDoses, adherencePercentage };
  } catch (error) {
    console.error('Error calculating adherence:', error);
    return { takenDoses: 0, missedDoses: 0, adherencePercentage: 0 };
  }
};

/**
 * Get all medications from localStorage
 */
export const getMedications = async () => {
  try {
    const data = localStorage.getItem(MEDICATIONS_STORAGE_KEY);
    const medications = data ? JSON.parse(data) : [];
    
    // Calculate adherence for each medication
    return medications.map(medication => {
      const adherenceData = calculateAdherenceForMedication(medication.id);
      return {
        ...medication,
        takenDoses: adherenceData.takenDoses,
        missedDoses: adherenceData.missedDoses,
        adherencePercentage: adherenceData.adherencePercentage
      };
    });
  } catch (error) {
    console.error('Error getting medications from localStorage:', error);
    return [];
  }
};

/**
 * Get medication by ID
 */
export const getMedicationById = async (id) => {
  try {
    const medications = await getMedications();
    return medications.find(med => med.id === parseInt(id)) || null;
  } catch (error) {
    console.error('Error getting medication by ID:', error);
    return null;
  }
};

/**
 * Create new medication
 */
export const createMedication = async (medicationData) => {
  try {
    const medications = await getMedications();
    const newMedication = {
      id: getNextId(),
      ...medicationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    medications.push(newMedication);
    localStorage.setItem(MEDICATIONS_STORAGE_KEY, JSON.stringify(medications));
    return newMedication;
  } catch (error) {
    console.error('Error creating medication:', error);
    throw error;
  }
};

/**
 * Update medication - resets everything except adherence when editing
 */
export const updateMedication = async (id, medicationData) => {
  try {
    const medications = await getMedications();
    const index = medications.findIndex(med => med.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Medication not found');
    }
    
    // Preserve adherence data from existing medication
    const existingMedication = medications[index];
    const adherenceData = calculateAdherenceForMedication(id);
    
    // Reset everything except adherence - this creates a "new dosage"
    medications[index] = {
      id: parseInt(id),
      name: medicationData.name,
      dosage: medicationData.dosage,
      frequency: medicationData.frequency,
      startDate: medicationData.startDate,
      quantity: medicationData.quantity,
      daysSupply: medicationData.daysSupply,
      // Preserve adherence data
      takenDoses: adherenceData.takenDoses,
      missedDoses: adherenceData.missedDoses,
      adherencePercentage: adherenceData.adherencePercentage,
      // Preserve creation date, update modification date
      createdAt: existingMedication.createdAt,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(MEDICATIONS_STORAGE_KEY, JSON.stringify(medications));
    return medications[index];
  } catch (error) {
    console.error('Error updating medication:', error);
    throw error;
  }
};

/**
 * Delete medication
 */
export const deleteMedication = async (id) => {
  try {
    const medications = await getMedications();
    const index = medications.findIndex(med => med.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Medication not found');
    }
    
    medications.splice(index, 1);
    localStorage.setItem(MEDICATIONS_STORAGE_KEY, JSON.stringify(medications));
    
    // Also delete associated dose history
    const doseHistory = getDoseHistory();
    const filteredDoseHistory = doseHistory.filter(dose => dose.medicationId !== parseInt(id));
    localStorage.setItem(DOSE_HISTORY_STORAGE_KEY, JSON.stringify(filteredDoseHistory));
    
    return true;
  } catch (error) {
    console.error('Error deleting medication:', error);
    throw error;
  }
};

/**
 * Get dose history for a specific medication
 */
export const getDoseHistoryByMedication = async (medicationId) => {
  try {
    const doseHistory = getDoseHistory();
    return doseHistory.filter(dose => dose.medicationId === parseInt(medicationId));
  } catch (error) {
    console.error('Error getting dose history by medication:', error);
    return [];
  }
};

/**
 * Record a dose (add dose history entry)
 */
export const recordDose = async (doseData) => {
  try {
    const doseHistory = getDoseHistory();
    const newDose = {
      id: getNextId(),
      ...doseData,
      createdAt: new Date().toISOString()
    };
    doseHistory.push(newDose);
    localStorage.setItem(DOSE_HISTORY_STORAGE_KEY, JSON.stringify(doseHistory));
    
    // Update medication with new adherence data
    const adherenceData = calculateAdherenceForMedication(doseData.medicationId);
    const medications = await getMedications();
    const medicationIndex = medications.findIndex(med => med.id === parseInt(doseData.medicationId));
    
    if (medicationIndex !== -1) {
      medications[medicationIndex] = {
        ...medications[medicationIndex],
        takenDoses: adherenceData.takenDoses,
        missedDoses: adherenceData.missedDoses,
        adherencePercentage: adherenceData.adherencePercentage,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(MEDICATIONS_STORAGE_KEY, JSON.stringify(medications));
    }
    
    return newDose;
  } catch (error) {
    console.error('Error recording dose:', error);
    throw error;
  }
};

/**
 * Get medications needing refills (refill alerts)
 */
export const getRefillAlerts = async () => {
  try {
    const medications = await getMedications();
    const today = new Date();
    
    return medications.filter(med => {
      if (!med.quantity || !med.dosagePerDay) return false;
      
      const startDate = new Date(med.startDate);
      const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const totalDoses = daysSinceStart * parseInt(med.dosagePerDay);
      const remaining = parseInt(med.quantity) - totalDoses;
      const daysRemaining = remaining / parseInt(med.dosagePerDay);
      
      return daysRemaining <= 7 && daysRemaining > 0;
    });
  } catch (error) {
    console.error('Error getting refill alerts:', error);
    return [];
  }
};

