/**
 * Main App component for Medical UI Project - Medication Tracker
 */

import { useState, useEffect, useCallback } from 'react';
import MedicationForm from './components/MedicationForm';
import MedicationList from './components/MedicationList';
import RefillAlerts from './components/RefillAlerts';
import * as api from './services/api';

function App() {
  const [medications, setMedications] = useState([]);
  const [refillAlerts, setRefillAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMedication, setEditingMedication] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true);
      const medicationsData = await api.getMedications();
      // Ensure we always have an array
      setMedications(Array.isArray(medicationsData) ? medicationsData : []);
    } catch (error) {
      showNotification('Failed to load medications', 'error');
      console.error('Error fetching medications:', error);
      setMedications([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRefillAlerts = useCallback(async () => {
    try {
      const alertsData = await api.getRefillAlerts();
      // Ensure we always have an array
      setRefillAlerts(Array.isArray(alertsData) ? alertsData : []);
    } catch (error) {
      console.error('Error fetching refill alerts:', error);
      setRefillAlerts([]); // Set empty array on error
    }
  }, []);

  // Fetch medications on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [medicationsData, alertsData] = await Promise.all([
          api.getMedications(),
          api.getRefillAlerts()
        ]);
        
        // Ensure we always have arrays
        setMedications(Array.isArray(medicationsData) ? medicationsData : []);
        setRefillAlerts(Array.isArray(alertsData) ? alertsData : []);
      } catch (error) {
        showNotification('Failed to load data', 'error');
        console.error('Error loading data:', error);
        setMedications([]);
        setRefillAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array - only run once on mount

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleAddMedication = async (medicationData) => {
    try {
      await api.createMedication(medicationData);
      showNotification('Medication added successfully!', 'success');
      await fetchMedications();
      await fetchRefillAlerts();
      setShowForm(false);
    } catch (error) {
      showNotification('Failed to add medication', 'error');
      console.error('Error adding medication:', error);
    }
  };

  const handleUpdateMedication = async (medicationData) => {
    try {
      await api.updateMedication(editingMedication.id, medicationData);
      showNotification('Medication updated successfully!', 'success');
      await fetchMedications();
      await fetchRefillAlerts();
      setEditingMedication(null);
    } catch (error) {
      showNotification('Failed to update medication', 'error');
      console.error('Error updating medication:', error);
    }
  };

  const handleDeleteMedication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medication?')) {
      return;
    }

    try {
      await api.deleteMedication(id);
      showNotification('Medication deleted successfully!', 'success');
      await fetchMedications();
      await fetchRefillAlerts();
    } catch (error) {
      showNotification('Failed to delete medication', 'error');
      console.error('Error deleting medication:', error);
    }
  };

  const handleRecordDose = async (medicationId, status) => {
    try {
      await api.recordDose({
        medicationId,
        date: new Date().toISOString().split('T')[0],
        status,
      });
      showNotification(`Dose marked as ${status}!`, 'success');
      await fetchMedications();
    } catch (error) {
      showNotification('Failed to record dose', 'error');
      console.error('Error recording dose:', error);
    }
  };

  const handleEdit = (medication) => {
    setEditingMedication(medication);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingMedication(null);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (editingMedication) {
      setEditingMedication(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Medical Tracker</h1>
              <p className="text-blue-100 text-sm mt-1">Medication Refill Management</p>
            </div>
            <button
              onClick={toggleForm}
              className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors shadow-md"
            >
              {showForm ? 'Close Form' : '+ Add Medication'}
            </button>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification.show && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`p-4 rounded-md ${
              notification.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Refill Alerts */}
        <RefillAlerts alerts={refillAlerts} />

        {/* Medication Form Modal */}
        {(showForm || editingMedication) && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                editingMedication ? handleCancelEdit() : toggleForm();
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingMedication ? 'Edit Medication' : 'Add New Medication'}
                </h2>
                <button
                  onClick={editingMedication ? handleCancelEdit : toggleForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <MedicationForm
                  onSubmit={editingMedication ? handleUpdateMedication : handleAddMedication}
                  onCancel={editingMedication ? handleCancelEdit : toggleForm}
                  initialData={editingMedication}
                />
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Total Medications</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{(medications || []).length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Needs Refill</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {(medications || []).filter(m => m.status === 'running-low').length}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase">Overdue</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {(medications || []).filter(m => m.status === 'overdue').length}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Medication List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Medications</h2>
          <MedicationList
            medications={medications}
            onEdit={handleEdit}
            onDelete={handleDeleteMedication}
            onRecordDose={handleRecordDose}
            loading={loading}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Medical UI Project - Medication Tracker. Built with React & Express.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
