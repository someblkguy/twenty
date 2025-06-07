import { WorkflowSendNotificationActionInput } from './workflow-send-notification-action-input.type';
import { BaseWorkflowActionSettings } from '../../types/workflow-action-settings.type';

export type WorkflowSendNotificationActionSettings = BaseWorkflowActionSettings & {
  input: WorkflowSendNotificationActionInput;
};
