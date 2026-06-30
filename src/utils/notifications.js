import { Capacitor } from '@capacitor/core';

// Dynamically import @capacitor/local-notifications on native platforms to prevent crash if not installed
let LocalNotifications = null;
if (Capacitor.isNativePlatform()) {
  import('@capacitor/local-notifications').then(m => {
    LocalNotifications = m.LocalNotifications;
  }).catch(err => {
    console.warn("Capacitor Local Notifications plugin is not loaded yet:", err);
  });
}

export const requestNotificationPermission = async () => {
  try {
    if (Capacitor.isNativePlatform() && LocalNotifications) {
      const status = await LocalNotifications.requestPermissions();
      return status.display === 'granted';
    } else if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  } catch (e) {
    console.error("Error requesting notification permission:", e);
  }
  return false;
};

export const scheduleWeeklyReminder = async (enabled) => {
  try {
    if (!enabled) {
      // Cancel scheduled notifications on native devices
      if (Capacitor.isNativePlatform() && LocalNotifications) {
        await LocalNotifications.cancel({ notifications: [{ id: 4422 }] });
      }
      return;
    }

    // If enabled, request permission first
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    if (Capacitor.isNativePlatform() && LocalNotifications) {
      // Cancel any existing reminder first to prevent duplication
      await LocalNotifications.cancel({ notifications: [{ id: 4422 }] });

      // Schedule weekly reminder (handled natively by the OS)
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 4422,
            title: "تذكير أسبوعي",
            body: "يرجى عمل نسخة احتياطية لبياناتك لحمايتها من الفقدان",
            schedule: {
              every: 'week',
              allowWhileIdle: true
            }
          }
        ]
      });
      console.log("Weekly native reminder scheduled successfully.");
    } else {
      // Web Browser fallback:
      // Since browsers cannot schedule background alarms when tab is closed, 
      // we check when the app is opened if 7 days have passed since the last notification.
      const lastNotify = localStorage.getItem('razan_last_notification_time');
      const now = Date.now();
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

      if (!lastNotify || (now - Number(lastNotify)) > SEVEN_DAYS) {
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
          new Notification("تذكير أسبوعي", {
            body: "يرجى عمل نسخة احتياطية لبياناتك لحمايتها من الفقدان",
            icon: "/logo.png"
          });
          localStorage.setItem('razan_last_notification_time', String(now));
        }
      }
    }
  } catch (e) {
    console.error("Error scheduling weekly reminder:", e);
  }
};
