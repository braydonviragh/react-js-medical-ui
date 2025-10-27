/**
 * Controller for medication-related operations
 * Contains business logic and calculations
 */

const store = require('../data/store');

/**
 * Calculate medication status and remaining doses
 */
const calculateMedicationStatus = (medication, doseHistory) => {
  const now = new Date();
  const startDate = new Date(medication.startDate);
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  
  // Calculate expected doses taken based on frequency
  const expectedDoses = daysSinceStart * medication.frequency;
  
  // Calculate actual doses consumed
  const takenDoses = doseHistory.filter(dose => dose.status === 'taken').length;
  const missedDoses = doseHistory.filter(dose => dose.status === 'missed').length;
  const totalRecordedDoses = takenDoses + missedDoses;
  
  // Use taken doses for calculation, or estimate from days if no history
  const dosesConsumed = takenDoses > 0 ? takenDoses : Math.min(expectedDoses, medication.quantity);
  
  // Calculate remaining
  const dosesRemaining = Math.max(0, medication.quantity - dosesConsumed);
  const daysRemaining = medication.frequency > 0 ? Math.floor(dosesRemaining / medication.frequency) : 0;
  
  // Calculate refill date
  const refillDate = new Date(now);
  refillDate.setDate(refillDate.getDate() + daysRemaining);
  
  // Determine status
  let status = 'on-track';
  if (daysRemaining <= 0) {
    status = 'overdue';
  } else if (daysRemaining <= 7) {
    status = 'running-low';
  }
  
  // Calculate adherence percentage
  let adherencePercentage = 100;
  if (totalRecordedDoses > 0) {
    adherencePercentage = Math.round((takenDoses / (takenDoses + missedDoses)) * 100);
  }
  
  // Calculate progress (percentage of medication remaining)
  const progressPercentage = medication.quantity > 0 
    ? Math.round((dosesRemaining / medication.quantity) * 100) 
    : 0;
  
  return {
    dosesRemaining,
    daysRemaining,
    refillDate: refillDate.toISOString().split('T')[0],
    status,
    adherencePercentage,
    progressPercentage,
    takenDoses,
    missedDoses,
    expectedDoses: Math.floor(expectedDoses)
  };
};

/**
 * Get all medications with calculated status
 */
const getAllMedications = (req, res) => {
  try {
    const medications = store.getMedications();
    
    const medicationsWithStatus = medications.map(med => {
      const doseHistory = store.getDoseHistory(med.id);
      const status = calculateMedicationStatus(med, doseHistory);
      
      return {
        ...med,
        ...status
      };
    });
    
    res.json({
      success: true,
      data: medicationsWithStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get single medication by ID
 */
const getMedicationById = (req, res) => {
  try {
    const medication = store.getMedicationById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({
        success: false,
        error: 'Medication not found'
      });
    }
    
    const doseHistory = store.getDoseHistory(medication.id);
    const status = calculateMedicationStatus(medication, doseHistory);
    
    res.json({
      success: true,
      data: {
        ...medication,
        ...status,
        doseHistory
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Create new medication
 */
const createMedication = (req, res) => {
  try {
    const { name, dosage, frequency, startDate, quantity, daysSupply } = req.body;
    
    // Validation
    if (!name || !dosage || !frequency || !startDate || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, dosage, frequency, startDate, quantity'
      });
    }
    
    if (frequency <= 0 || quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Frequency and quantity must be positive numbers'
      });
    }
    
    const medicationData = {
      name,
      dosage,
      frequency: parseFloat(frequency),
      startDate,
      quantity: parseInt(quantity),
      daysSupply: daysSupply || Math.floor(quantity / frequency)
    };
    
    const newMedication = store.addMedication(medicationData);
    const doseHistory = store.getDoseHistory(newMedication.id);
    const status = calculateMedicationStatus(newMedication, doseHistory);
    
    res.status(201).json({
      success: true,
      data: {
        ...newMedication,
        ...status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update medication
 */
const updateMedication = (req, res) => {
  try {
    const { name, dosage, frequency, startDate, quantity, daysSupply } = req.body;
    
    const existingMedication = store.getMedicationById(req.params.id);
    if (!existingMedication) {
      return res.status(404).json({
        success: false,
        error: 'Medication not found'
      });
    }
    
    const medicationData = {
      name: name || existingMedication.name,
      dosage: dosage || existingMedication.dosage,
      frequency: frequency ? parseFloat(frequency) : existingMedication.frequency,
      startDate: startDate || existingMedication.startDate,
      quantity: quantity ? parseInt(quantity) : existingMedication.quantity,
      daysSupply: daysSupply || existingMedication.daysSupply
    };
    
    const updatedMedication = store.updateMedication(req.params.id, medicationData);
    const doseHistory = store.getDoseHistory(updatedMedication.id);
    const status = calculateMedicationStatus(updatedMedication, doseHistory);
    
    res.json({
      success: true,
      data: {
        ...updatedMedication,
        ...status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Delete medication
 */
const deleteMedication = (req, res) => {
  try {
    const success = store.deleteMedication(req.params.id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Medication not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Medication deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get medications needing refills soon (within 7 days)
 */
const getRefillAlerts = (req, res) => {
  try {
    const medications = store.getMedications();
    
    const alertMedications = medications
      .map(med => {
        const doseHistory = store.getDoseHistory(med.id);
        const status = calculateMedicationStatus(med, doseHistory);
        return { ...med, ...status };
      })
      .filter(med => med.status === 'running-low' || med.status === 'overdue');
    
    res.json({
      success: true,
      data: alertMedications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Record a dose (taken or missed)
 */
const recordDose = (req, res) => {
  try {
    const { medicationId, date, status } = req.body;
    
    if (!medicationId || !date || !status) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: medicationId, date, status'
      });
    }
    
    if (status !== 'taken' && status !== 'missed') {
      return res.status(400).json({
        success: false,
        error: 'Status must be either "taken" or "missed"'
      });
    }
    
    const medication = store.getMedicationById(medicationId);
    if (!medication) {
      return res.status(404).json({
        success: false,
        error: 'Medication not found'
      });
    }
    
    const doseData = {
      medicationId: parseInt(medicationId),
      date,
      status
    };
    
    const newDose = store.addDose(doseData);
    
    res.status(201).json({
      success: true,
      data: newDose
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get dose history for a medication
 */
const getDoseHistory = (req, res) => {
  try {
    const medication = store.getMedicationById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({
        success: false,
        error: 'Medication not found'
      });
    }
    
    const doseHistory = store.getDoseHistory(req.params.id);
    
    res.json({
      success: true,
      data: doseHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  getRefillAlerts,
  recordDose,
  getDoseHistory
};

