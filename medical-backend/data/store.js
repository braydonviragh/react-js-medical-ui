/**
 * In-memory data store for medications and dose history
 */

// Medications storage
let medications = [];
let medicationIdCounter = 1;

// Dose history storage
let doseHistory = [];
let doseIdCounter = 1;

/**
 * Get all medications
 */
const getMedications = () => medications;

/**
 * Get medication by ID
 */
const getMedicationById = (id) => {
  return medications.find(med => med.id === parseInt(id));
};

/**
 * Add new medication
 */
const addMedication = (medicationData) => {
  const newMedication = {
    id: medicationIdCounter++,
    ...medicationData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  medications.push(newMedication);
  return newMedication;
};

/**
 * Update medication
 */
const updateMedication = (id, medicationData) => {
  const index = medications.findIndex(med => med.id === parseInt(id));
  if (index === -1) return null;
  
  medications[index] = {
    ...medications[index],
    ...medicationData,
    id: parseInt(id),
    updatedAt: new Date().toISOString()
  };
  return medications[index];
};

/**
 * Delete medication
 */
const deleteMedication = (id) => {
  const index = medications.findIndex(med => med.id === parseInt(id));
  if (index === -1) return false;
  
  medications.splice(index, 1);
  // Also delete associated dose history
  doseHistory = doseHistory.filter(dose => dose.medicationId !== parseInt(id));
  return true;
};

/**
 * Get dose history for a medication
 */
const getDoseHistory = (medicationId) => {
  return doseHistory.filter(dose => dose.medicationId === parseInt(medicationId));
};

/**
 * Add dose record
 */
const addDose = (doseData) => {
  const newDose = {
    id: doseIdCounter++,
    ...doseData,
    createdAt: new Date().toISOString()
  };
  doseHistory.push(newDose);
  return newDose;
};

/**
 * Update dose record
 */
const updateDose = (id, doseData) => {
  const index = doseHistory.findIndex(dose => dose.id === parseInt(id));
  if (index === -1) return null;
  
  doseHistory[index] = {
    ...doseHistory[index],
    ...doseData,
    id: parseInt(id)
  };
  return doseHistory[index];
};

/**
 * Delete dose record
 */
const deleteDose = (id) => {
  const index = doseHistory.findIndex(dose => dose.id === parseInt(id));
  if (index === -1) return false;
  
  doseHistory.splice(index, 1);
  return true;
};

module.exports = {
  getMedications,
  getMedicationById,
  addMedication,
  updateMedication,
  deleteMedication,
  getDoseHistory,
  addDose,
  updateDose,
  deleteDose
};

