import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { NotificationService } from 'src/modules/notification/notification.service';
import { WorkflowExecutor } from '../../interfaces/workflow-executor.interface';
import {
  WorkflowStepExecutorException,
  WorkflowStepExecutorExceptionCode,
} from '../../exceptions/workflow-step-executor.exception';
import { WorkflowExecutorInput } from '../../types/workflow-executor-input';
import { WorkflowExecutorOutput } from '../../types/workflow-executor-output.type';
import { resolveInput } from '../../utils/variable-resolver.util';
import { isWorkflowSendNotificationAction } from './guards/is-workflow-send-notification-action.guard';
import { WorkflowSendNotificationActionInput } from './types/workflow-send-notification-action-input.type';

export type WorkflowSendNotificationStepOutputSchema = {
  success: boolean;
};

@Injectable()
export class SendNotificationWorkflowAction implements WorkflowExecutor {
  constructor(private readonly notificationService: NotificationService) {}

  async execute({ currentStepId, steps, context }: WorkflowExecutorInput): Promise<WorkflowExecutorOutput> {
    const step = steps.find((s) => s.id === currentStepId);

    if (!step) {
      throw new WorkflowStepExecutorException(
        'Step not found',
        WorkflowStepExecutorExceptionCode.STEP_NOT_FOUND,
      );
    }

    if (!isWorkflowSendNotificationAction(step)) {
      throw new WorkflowStepExecutorException(
        'Step is not a send notification action',
        WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE,
      );
    }

    const input = resolveInput(step.settings.input, context) as WorkflowSendNotificationActionInput;

    const schema = z.object({ userId: z.string().uuid(), message: z.string() });
    const result = schema.safeParse(input);
    if (!result.success) {
      throw new WorkflowStepExecutorException(
        'Invalid notification input',
        WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE,
      );
    }

    this.notificationService.sendNotification(input.userId, input.message);

    return { result: { success: true } as WorkflowSendNotificationStepOutputSchema };
  }
}
