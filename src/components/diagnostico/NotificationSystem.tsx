import React, { useEffect, useState } from 'react';
import { Bell, X, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Notification {
  id: string;
  type: 'urgency' | 'social-proof' | 'guarantee';
  message: string;
  icon: React.ReactNode;
  duration: number;
}

const NotificationSystem: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationQueue] = useState<Notification[]>([
    {
      id: '1',
      type: 'social-proof',
      message: '3 empresas agendaram diagnósticos hoje',
      icon: <Users className="w-4 h-4" />,
      duration: 4000
    },
    {
      id: '2',
      type: 'urgency',
      message: 'Últimas 2 vagas para diagnósticos desta semana',
      icon: <Clock className="w-4 h-4" />,
      duration: 5000
    },
    {
      id: '3',
      type: 'guarantee',
      message: '100% gratuito - sem compromisso',
      icon: <Bell className="w-4 h-4" />,
      duration: 4000
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const showNotification = () => {
      if (currentIndex < notificationQueue.length) {
        const notification = notificationQueue[currentIndex];
        setCurrentNotification(notification);

        setTimeout(() => {
          setCurrentNotification(null);
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % notificationQueue.length);
          }, 500);
        }, notification.duration);
      }
    };

    const timer = setTimeout(showNotification, currentNotification ? 0 : 3000);
    return () => clearTimeout(timer);
  }, [currentIndex, notificationQueue, currentNotification, isPaused]);

  const handleDismiss = () => {
    setCurrentNotification(null);
    setIsPaused(true);
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'urgency':
        return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'social-proof':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      case 'guarantee':
        return 'border-green-200 bg-green-50 text-green-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {currentNotification && (
        <div className="animate-slide-in-left">
          <Card className={`max-w-sm shadow-lg border-2 ${getNotificationStyles(currentNotification.type)}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {currentNotification.icon}
                  </div>
                  <p className="text-sm font-medium">
                    {currentNotification.message}
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
