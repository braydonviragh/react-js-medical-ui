/**
 * Card component to display individual medication
 */

import ProgressBar from './ProgressBar';

const MedicationCard = ({ medication, onEdit, onDelete, onRecordDose }) => {
  const {
    id,
    name,
    dosage,
    frequency,
    dosesRemaining,
    daysRemaining,
    refillDate,
    status,
    progressPercentage,
    adherencePercentage,
    takenDoses,
    missedDoses,
  } = medication;

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
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status] || badges['on-track']}`}>
        {labels[status] || 'Unknown'}
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
        <ProgressBar percentage={progressPercentage} status={status} />
      </div>

      {/* Medication Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">Frequency</p>
          <p className="text-sm font-semibold text-gray-700">{frequency}x daily</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Doses Left</p>
          <p className="text-sm font-semibold text-gray-700">{dosesRemaining} doses</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Days Left</p>
          <p className="text-sm font-semibold text-gray-700">{daysRemaining} days</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Refill Date</p>
          <p className="text-sm font-semibold text-gray-700">
            {new Date(refillDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Adherence Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Adherence</span>
          <span className={`text-sm font-bold ${adherencePercentage >= 80 ? 'text-green-600' : adherencePercentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {adherencePercentage}%
          </span>
        </div>
        <div className="flex gap-4 text-xs text-gray-600">
          <span>Taken: {takenDoses}</span>
          <span>Missed: {missedDoses}</span>
        </div>
      </div>

      {/* Action Buttons */}
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
    </div>
  );
};

export default MedicationCard;

