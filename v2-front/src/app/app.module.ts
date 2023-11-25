import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/services/jwt.interceptor';


import { LoginComponent } from './Authentification/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './Authentification/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardTopAdminComponent } from './dashboard-top-admin/dashboard-top-admin.component';
import { Header2Component } from './dashboard-top-admin/header2/header2.component';
import { Sidebar2Component } from './dashboard-top-admin/sidebar2/sidebar2.component';
import { OrganisationsComponent } from './dashboard-top-admin/organisations/organisations.component';

import { AddOrganisationComponent } from './dashboard-top-admin/add-organisation/add-organisation.component';
import { AdministrateursComponent } from './dashboard-top-admin/administrateurs/administrateurs.component';
import { AddAdministrateurComponent } from './dashboard-top-admin/add-administrateur/add-administrateur.component';
import { UpdateAdministrateurComponent } from './dashboard-top-admin/update-administrateur/update-administrateur.component';
import { DeleteConfirmationModalComponent } from './dashboard-top-admin/delete-confirmation-modal/delete-confirmation-modal.component';
import { UsersComponent } from './dashboard-top-admin/users/users.component';
import { UserDetailsComponent } from './dashboard-top-admin/user-details/user-details.component';

import { Header1Component } from './/org-dashboard/header1/header1.component';
import { Sidebar1Component } from './org-dashboard/sidebar1/sidebar1.component';
import { UtilisateursComponent } from './org-dashboard/utilisateurs/utilisateurs.component';
import { UpdateUtilisateurComponent } from './org-dashboard/update-utilisateur/update-utilisateur.component';
import { AddUtilisateurComponent } from './org-dashboard/add-utilisateur/add-utilisateur.component';
import { TasksComponent } from './org-dashboard/tasks/tasks.component';
import { AddTaskComponent } from './org-dashboard/add-task/add-task.component';
import { UpdateTaskComponent } from './org-dashboard/update-task/update-task.component';
import { DeleteConfirmationOrgModalComponent } from './org-dashboard/delete-confirmation-org-modal/delete-confirmation-org-modal.component';
import { DeleteConfirmationTakModalComponent } from './org-dashboard/delete-confirmation-tak-modal/delete-confirmation-tak-modal.component';
import { UserUIComponent } from './user-ui/user-ui.component';
import { Header3Component } from './user-ui/header3/header3.component';
import { ListComponent } from './user-ui/list/list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmationorgModalComponent } from './dashboard-top-admin/delete-confirmationorg-modal/delete-confirmationorg-modal.component';
import { UpdateOrganizationComponent } from './dashboard-top-admin/update-organisation/update-organisation.component';
import { Base64ToSafeUrlPipe } from './org-dashboard/utilisateurs/base64-to-safe-url.pipe';
import { UserChatComponent } from './user-ui/user-chat/user-chat.component';
import { DetailsPermissionsComponent } from './org-dashboard/details-permissions/details-permissions.component';
import { EditTaskComponent } from './user-ui/edit-task/edit-task.component';
import { ChatboxComponent } from './user-ui/chatbox/chatbox.component';
import { MatIconModule } from '@angular/material/icon';
import { OrgDashboardComponent } from './org-dashboard/org-dashboard.component';
import { AjouteTaskComponent } from './user-ui/ajoute-task/ajoute-task.component';

@NgModule({
  declarations: [

    ChatboxComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardTopAdminComponent,
    Header2Component,
    Sidebar2Component,
    OrganisationsComponent,
    UpdateOrganizationComponent,
    AddOrganisationComponent,
    AdministrateursComponent,
    AddAdministrateurComponent,
    UpdateAdministrateurComponent,
    DeleteConfirmationModalComponent,
    UsersComponent,
    UserDetailsComponent,
    OrgDashboardComponent,
    Header1Component,
    Sidebar1Component,
    UtilisateursComponent,
    UpdateUtilisateurComponent,
    AddUtilisateurComponent,
    TasksComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    DeleteConfirmationOrgModalComponent,
    DeleteConfirmationTakModalComponent,
    UserUIComponent,
    Header3Component,
    ListComponent,
    DeleteConfirmationorgModalComponent,
    Base64ToSafeUrlPipe,

    UserChatComponent,
     DetailsPermissionsComponent,
     EditTaskComponent,
     AjouteTaskComponent,



  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
