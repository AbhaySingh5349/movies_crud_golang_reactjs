import { useEffect } from 'react';

interface AlertProps {
  type: string;
  message: string;
  onClose: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  // Choose the color and icon based on the alert type
  const alertColors: Record<string, string> = {
    danger: 'red',
    success: 'green',
  };

  const alertIcons: Record<string, string> = {
    danger: 'bg-red-50 dark:text-red-400',
    success: 'bg-green-50 dark:text-green-400',
  };

  const color: string = alertColors[type] || 'gray'; // Default to gray for unknown types
  const iconStyle: string = alertIcons[type] || '';

  useEffect(() => {
    // Set a timer to close the alert after 5 seconds
    const timerId = setTimeout(() => {
      onClose();
    }, 3000);

    // Clean up the timer when the component unmounts or onClose is called
    return () => clearTimeout(timerId);
  }, [onClose]);

  return (
    <div
      className={`mx-auto flex items-center p-4 mb-4 text-sm text-${color}-800 rounded-lg ${iconStyle}`}
      role="alert"
      onClick={onClose}
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className={`font-medium text-${color}-800`}>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
