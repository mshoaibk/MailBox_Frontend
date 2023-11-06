import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './home/inbox/inbox.component';
import { SentboxComponent } from './home/sentbox/sentbox.component';
import { FormsModule } from '@angular/forms';
import { UserManagementComponent } from './home/user-management/user-management.component';

@NgModule({
  declarations: [
    HomeComponent,
    InboxComponent,
    SentboxComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,FormsModule
  ]
})
export class DashboardModule { }
