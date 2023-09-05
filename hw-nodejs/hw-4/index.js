const EventEmitter = require('events');

class NotificationService extends EventEmitter {
  // Имитация отправки уведомления
  sendNotification(message) {
    console.log(`Отправка уведомления: "${message}"`);
    
    // После отправки уведомления, активируем событие 'sent'
    this.emit('sent', message);
  }
}

const notifier = new NotificationService();

// Добавляем слушателя для события 'sent'
notifier.on('sent', (message) => {
  console.log(`Уведомление успешно отправлено: "${message}"`);
});

// Попробуем отправить уведомление
notifier.sendNotification('Привет, мир!');
