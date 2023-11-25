import { TaskStatus } from "./taskstatus.model";

export const TaskStatusColors = {
  [TaskStatus.TO_DO]: 'text-gray-500',
  [TaskStatus.IN_PROGRESS]: 'text-yellow-500',
  [TaskStatus.DONE]: 'text-green-500',
  [TaskStatus.BLOCKED]: 'text-red-500'
};
