/**
 * Card component to display individual medication
 */

import ProgressBar from './ProgressBar';

const MedicationCard = ({ medication, onEdit, onDelete, onRecordDose }) => {
  // Destructure with fallback values to prevent undefined errors
  const {
    id,
    name = 'Unknown',
    dosage = '',
    frequency = '',
    quantity = 0,
    dosagePerDay = 1,
    status,
    progressPercentage = 0,
    adherencePercentage = 0,
    takenDoses = 0,
    missedDoses = 0,
  } = medication;

  // Calculate doses remaining based on actual doses taken (not time-based)
  const calculateDosesRemaining = () => {
    const totalQuantity = parseInt(quantity) || 0;
    const dosesTaken = parseInt(takenDoses) || 0;
    return Math.max(0, totalQuantity - dosesTaken);
  };

  const calculateStatus = () => {
    const dosesRemaining = calculateDosesRemaining();
    
    if (dosesRemaining > 7) return 'on-track';
    if (dosesRemaining > 0) return 'running-low';
    return 'overdue';
  };

  const calculateAdherencePercentage = () => {
    const totalDoses = parseInt(takenDoses) + parseInt(missedDoses);
    if (totalDoses === 0) return 0;
    return Math.round((parseInt(takenDoses) / totalDoses) * 100);
  };

  const calculateRefillDate = () => {
    const dosesRemaining = calculateDosesRemaining();
    if (dosesRemaining <= 0) return 'Now';
    
    const dosagePerDayValue = parseInt(dosagePerDay || frequency) || 1;
    const daysRemaining = Math.ceil(dosesRemaining / dosagePerDayValue);
    
    const refillDate = new Date();
    refillDate.setDate(refillDate.getDate() + daysRemaining);
    return refillDate.toLocaleDateString();
  };

  const calculatedDosesRemaining = calculateDosesRemaining();
  const calculatedStatus = status || calculateStatus();
  const calculatedAdherencePercentage = adherencePercentage || calculateAdherencePercentage();
  const calculatedRefillDate = calculateRefillDate();
  const isComplete = calculatedDosesRemaining === 0;

  // Status badge styling
  const getStatusBadge = () => {
    const badges = {
      'on-track': 'bg-green-100 text-green-800',
      'running-low': 'bg-yellow-100 text-yellow-800',
      'overdue': 'bg-red-100 text-red-800',
    };

    const labels = {
      'on-track': 'On Track',
      'running-low': 'Running Low',
      'overdue': 'Overdue',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[calculatedStatus] || badges['on-track']}`}>
        {labels[calculatedStatus] || 'Unknown'}
      </span>
    );
  };

  const handleRecordTaken = () => {
    onRecordDose(id, 'taken');
  };

  const handleRecordMissed = () => {
    onRecordDose(id, 'missed');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{dosage}</p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <ProgressBar percentage={Math.round(progressPercentage || (quantity > 0 ? (calculatedDosesRemaining / quantity) * 100 : 0))} status={calculatedStatus} />
      </div>

      {/* Medication Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">Frequency</p>
          <p className="text-sm font-semibold text-gray-700">{frequency || dosagePerDay || 0}x daily</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Doses Left</p>
          <p className="text-sm font-semibold text-gray-700">
            {calculatedDosesRemaining >= 0 ? `${calculatedDosesRemaining} doses` : '0 doses'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Total Quantity</p>
          <p className="text-sm font-semibold text-gray-700">{quantity} doses</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Next Refill</p>
          <p className="text-sm font-semibold text-gray-700">
            {calculatedRefillDate}
          </p>
        </div>
      </div>

      {/* Adherence Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Adherence</span>
          <span className={`text-sm font-bold ${calculatedAdherencePercentage >= 80 ? 'text-green-600' : calculatedAdherencePercentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {calculatedAdherencePercentage}%
          </span>
        </div>
        <div className="flex gap-4 text-xs text-gray-600">
          <span>Taken: {takenDoses}</span>
          <span>Missed: {missedDoses}</span>
        </div>
      </div>

      {/* Action Buttons - Hide all buttons when complete */}
      {!isComplete && (
        <>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRecordTaken}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Mark Taken
            </button>
            <button
              onClick={handleRecordMissed}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Mark Missed
            </button>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(medication)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}

      {/* Completion Message */}
      {isComplete && (
        <div className="text-center py-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center mb-2">
            <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-lg font-semibold text-green-800">Dosage Complete!</span>
          </div>
          <p className="text-sm text-green-600">All doses have been taken</p>
        </div>
      )}
    </div>
  );
};

export default MedicationCard;

