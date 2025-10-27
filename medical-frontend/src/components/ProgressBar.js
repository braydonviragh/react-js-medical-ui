/**
 * Progress bar component to show medication remaining
 */

const ProgressBar = ({ percentage, status }) => {
  // Determine color based on status
  const getColorClass = () => {
    switch (status) {
      case 'overdue':
        return 'bg-red-500';
      case 'running-low':
        return 'bg-yellow-500';
      case 'on-track':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  // Ensure percentage is a valid number
  const safePercentage = isNaN(percentage) || percentage === null || percentage === undefined ? 0 : percentage;
  const displayPercentage = Math.max(0, Math.min(100, safePercentage));
  const roundedPercentage = Math.round(displayPercentage);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          {roundedPercentage}% remaining
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${getColorClass()}`}
          style={{ width: `${displayPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

