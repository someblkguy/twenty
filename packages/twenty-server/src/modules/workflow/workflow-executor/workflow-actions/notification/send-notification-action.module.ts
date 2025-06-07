import { Module } from '@nestjs/common';

import { NotificationModule } from 'src/modules/notification/notification.module';
import { SendNotificationWorkflowAction } from './send-notification.workflow-action';

@Module({
  imports: [NotificationModule],
  providers: [SendNotificationWorkflowAction],
  exports: [SendNotificationWorkflowAction],
})
export class SendNotificationActionModule {}
