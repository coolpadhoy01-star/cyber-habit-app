// mobile-glue.js - Capacitor integration helpers (no imports; uses global Capacitor injected by native runtime)
window.MobileGlue = {
  async requestNotificationPermission(){ 
    try{
      if(window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications){
        const perm = await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
        return perm.display === 'granted' || perm.granted;
      } else if('Notification' in window){
        if(Notification.permission === 'granted') return true;
        const p = await Notification.requestPermission();
        return p === 'granted';
      }
    }catch(e){ console.warn(e); }
    return false;
  },
  async scheduleLocalNotification({id=1,title='Reminder', body='Time to check', at=null}){
    try{
      if(window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications){
        const note = { id: id, title, body };
        if(at) note.schedule = { at: new Date(at) };
        await window.Capacitor.Plugins.LocalNotifications.schedule({ notifications: [ note ] });
        return true;
      } else if('Notification' in window){
        new Notification(title,{ body });
        return true;
      }
    }catch(e){
      console.warn('schedule failed', e);
      return false;
    }
    return false;
  }
};
// expose helpers to the app
window.ensureLocalNotifyPermission = window.MobileGlue.requestNotificationPermission;
window.scheduleLocalNotification = window.MobileGlue.scheduleLocalNotification;
