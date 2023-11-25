import { TaskStatus } from "./taskstatus.model";
import { User } from "./user.model";

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  creationDateTime: Date; 
  dueDateTime: Date;
  assignees: string[];
  assignedUser: User;
  priority: string;

  constructor(
    id: string,
    title: string,
    description: string,

    dueDateTime: Date,
    assignees: string[],
    assignedUser: User,
    priority: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = TaskStatus.TO_DO;
    this.creationDateTime = new Date(); // Initialisez ici la date actuelle
    this.dueDateTime = dueDateTime;
    this.assignees = assignees;
    this.assignedUser = assignedUser;
    this.priority = priority;
  }
}
