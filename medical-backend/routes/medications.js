/**
 * API routes for medication management
 */

const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

// Medication CRUD routes
router.get('/medications', medicationController.getAllMedications);
router.get('/medications/:id', medicationController.getMedicationById);
router.post('/medications', medicationController.createMedication);
router.put('/medications/:id', medicationController.updateMedication);
router.delete('/medications/:id', medicationController.deleteMedication);

// Refill alerts
router.get('/refill-alerts', medicationController.getRefillAlerts);

// Dose tracking
router.post('/medications/record-dose', medicationController.recordDose);
router.get('/medications/:id/dose-history', medicationController.getDoseHistory);

module.exports = router;

