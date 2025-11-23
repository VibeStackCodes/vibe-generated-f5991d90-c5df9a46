import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNotification } from '@/contexts/NotificationContext';
import { Bell, Lock, User } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    inApp: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    addNotification({
      type: 'success',
      message: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${!notifications[key] ? 'enabled' : 'disabled'}`,
      duration: 3000,
    });
  };

  const handleSaveSettings = () => {
    addNotification({
      type: 'success',
      message: 'Settings saved successfully',
      duration: 3000,
    });
  };

  return (
    <Layout title="Settings">
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Name"
              type="text"
              value={user?.name || ''}
              disabled
            />
            <Input
              label="Email"
              type="email"
              value={user?.email || ''}
              disabled
            />
            <Input
              label="Role"
              type="text"
              value={user?.role || 'Member'}
              disabled
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive task updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">In-App Notifications</p>
                <p className="text-sm text-gray-600">Show notifications within the app</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.inApp}
                onChange={() => handleNotificationChange('inApp')}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={20} />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">Two-factor authentication is currently disabled.</p>
            <Button variant="secondary">
              Enable Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button variant="primary" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};
