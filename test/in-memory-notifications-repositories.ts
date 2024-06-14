import { NotificationRepositories } from "@app/repositories/notification-repositories";
import { Notification } from "@app/entities/notification";
import { Content } from "@app/entities/content";

export class InMemoryNotificationRepositories implements NotificationRepositories {
  public notification: Notification[] = [];

  async create(notify: Notification) {
    this.notification.push(notify);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notification.find(item => item.id === notificationId);

    if (!notification) {
      return null;
    };

    return notification
  };

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notification.findIndex(item => item.id === notification.id);

    if (notificationIndex >= 0) {
      this.notification[notificationIndex] = notification
    }
  };

  async countManyByRecipientId(notificationId: string): Promise<number> {
    return this.notification.filter(item => item.recipientId === notificationId).length
  };
};
