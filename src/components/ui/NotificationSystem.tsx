"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeNotification } from '@/store/slices/uiSlice';

export function NotificationSystem() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.ui.notifications);

  useEffect(() => {
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, notification.duration);

      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`px-4 py-3 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : notification.type === 'warning'
              ? 'bg-yellow-500 text-black'
              : 'bg-blue-500 text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => dispatch(removeNotification(notification.id))}
              className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
