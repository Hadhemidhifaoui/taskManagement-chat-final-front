import { User } from './user.model'; // You need to import User and Task models if you haven't already
import { Task } from './task.model';

export class Organization {
  id: string;
  name: string;
  description: string;
  admin: User;
  creationDateTime : Date ;
  members: User[];
  tasks: Task[];
  adminUserId: string;
  [key: string]: any;
  constructor(
    id: string,
    name: string,
    description: string,
    creationDateTime : Date,
    admin: User,
    members: User[],
    tasks: Task[],
    adminUserId: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.admin = admin;
    this.creationDateTime = creationDateTime;
    this.members = members;
    this.tasks = tasks;
    this.adminUserId = adminUserId

  }
}
