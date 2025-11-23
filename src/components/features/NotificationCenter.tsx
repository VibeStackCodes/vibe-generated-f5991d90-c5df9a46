import React from 'react';
import { Notification } from '@/types';
import { useNotification } from '@/contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const notificationIcons = {
  success: <CheckCircle size={20} className="text-green-600" />,
  error: <AlertCircle size={20} className="text-red-600" />,
  warning: <AlertCircle size={20} className="text-yellow-600" />,
  info: <Info size={20} className="text-blue-600" />,
};

const notificationStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const NotificationItem: React.FC<{ notification: Notification; onClose: (id: string) => void }> = ({
  notification,
  onClose,
}) => {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border mb-3 animate-in fade-in slide-in-from-top-2',
        notificationStyles[notification.type]
      )}
    >
      {notificationIcons[notification.type]}
      <div className="flex-1">
        <p className="font-medium">{notification.message}</p>
        {notification.action && (
          <button
            onClick={notification.action.onClick}
            className="mt-2 text-sm font-semibold underline hover:no-underline"
          >
            {notification.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onClose(notification.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export const NotificationCenter: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-40 max-w-md">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

NotificationCenter.displayName = 'NotificationCenter';
