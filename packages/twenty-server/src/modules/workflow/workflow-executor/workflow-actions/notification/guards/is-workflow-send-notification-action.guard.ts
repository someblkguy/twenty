import {
  WorkflowAction,
  WorkflowActionType,
  WorkflowSendNotificationAction,
} from '../../types/workflow-action.type';

export const isWorkflowSendNotificationAction = (
  action: WorkflowAction,
): action is WorkflowSendNotificationAction => {
  return action.type === WorkflowActionType.SEND_NOTIFICATION;
};
