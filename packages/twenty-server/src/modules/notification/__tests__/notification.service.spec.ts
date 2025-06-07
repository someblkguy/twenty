import { NotificationService } from '../notification.service';

describe('NotificationService', () => {
  it('stores sent notifications', () => {
    const service = new NotificationService();
    service.sendNotification('user1', 'hello');
    expect(service.getNotifications()).toEqual([{ to: 'user1', message: 'hello' }]);
  });
});
