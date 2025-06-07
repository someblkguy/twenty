import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly notifications: { to: string; message: string }[] = [];

  sendNotification(to: string, message: string) {
    this.notifications.push({ to, message });
    // In real implementation, push to user notification center
    console.log(`Notify ${to}: ${message}`);
  }

  getNotifications() {
    return this.notifications;
  }
}
