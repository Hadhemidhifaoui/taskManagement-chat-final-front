import { Role } from '../models/role.model'; // You need to define the Role enum if you haven't already
import { Organization } from './organisation.model';

export class User {
  id: string;

  name: string;
  password?: string;
  email: string;
  role?: Role;
  organization?: Organization;
  organizationId?:string;
  organizationName?: string;
  creationDate?: Date;
  position?: string;
  fullName?: string;
  active?: boolean;
  validated?: boolean;
  profileImage?: string | null;
  conversationIds?:string;
  assignedTasks?: string[];
  permissions?: string[];
  ajouteTask?: boolean;
  supprimeTask?: boolean;

  constructor(
    id: string,
    name: string,

    email: string,

  ) {
    this.id = id;
    this.name = name;

    this.email = email;

  }
}

