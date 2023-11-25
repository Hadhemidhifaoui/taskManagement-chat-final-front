import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './Authentification/login/login.component';
import { RegisterComponent } from './Authentification/register/register.component';
import { DashboardTopAdminComponent } from './dashboard-top-admin/dashboard-top-admin.component';

import { OrganisationsComponent } from './dashboard-top-admin/organisations/organisations.component';

import { AddOrganisationComponent } from './dashboard-top-admin/add-organisation/add-organisation.component';
import { AdministrateursComponent } from './dashboard-top-admin/administrateurs/administrateurs.component';
import { AddAdministrateurComponent } from './dashboard-top-admin/add-administrateur/add-administrateur.component';
import { UpdateAdministrateurComponent } from './dashboard-top-admin/update-administrateur/update-administrateur.component';
import { UsersComponent } from './dashboard-top-admin/users/users.component';
import { UserDetailsComponent } from './dashboard-top-admin/user-details/user-details.component';
import { OrgDashboardComponent } from './org-dashboard/org-dashboard.component';
import { UtilisateursComponent } from './org-dashboard/utilisateurs/utilisateurs.component';
import { UpdateUtilisateurComponent } from './/org-dashboard/update-utilisateur/update-utilisateur.component';
import { AddUtilisateurComponent } from './org-dashboard/add-utilisateur/add-utilisateur.component';
import { TasksComponent } from './org-dashboard/tasks/tasks.component';
import { AddTaskComponent } from './org-dashboard/add-task/add-task.component';
import { UpdateTaskComponent } from './org-dashboard/update-task/update-task.component';
import { UserUIComponent } from './user-ui/user-ui.component';
import { ListComponent } from './user-ui/list/list.component';

import { UpdateOrganizationComponent } from './dashboard-top-admin/update-organisation/update-organisation.component';
import { UserChatComponent } from './user-ui/user-chat/user-chat.component';
import { ChatboxComponent } from './user-ui/chatbox/chatbox.component';
import { DetailsPermissionsComponent } from './org-dashboard/details-permissions/details-permissions.component';
import { EditTaskComponent } from './user-ui/edit-task/edit-task.component';
import { AjouteTaskComponent } from './user-ui/ajoute-task/ajoute-task.component';




const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'topAdmin',
    component: DashboardTopAdminComponent,
    children: [
      {
        path: '',
        component:OrganisationsComponent ,
      },
      { path: 'organizations/update/:id', component: UpdateOrganizationComponent },
      { path: 'organizations/add', component: AddOrganisationComponent },
      { path: 'admins', component: AdministrateursComponent },
      { path: 'admins/add', component: AddAdministrateurComponent },
      { path: 'admins/update/:id', component: UpdateAdministrateurComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserDetailsComponent },

    ],
  },
  {
    path: 'orgadmin',
    component: OrgDashboardComponent,
    children: [
      {
        path: '',
        component:UtilisateursComponent ,
      },
      { path: 'utilisateur/update/:id', component: UpdateUtilisateurComponent },
      { path: 'utilisateur/add', component: AddUtilisateurComponent },
      { path: 'utilisateur/:id', component: DetailsPermissionsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'tasks/add', component: AddTaskComponent },
      { path: 'tasks/update/:id', component: UpdateTaskComponent },
    ],
  },
  {
    path: 'ui',
    component: UserUIComponent,
    children: [
      {
        path: '',
        component:ListComponent ,
      },
      {
        path: 'chat',
        component:UserChatComponent ,
      },
      {
        path: 'chatBox',
        component:ChatboxComponent ,
      },

      { path: 'list/update/:id', component: EditTaskComponent },
      { path: 'list/add', component: AjouteTaskComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
