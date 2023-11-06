import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { commonAuthGuard } from '../common/auth-guard/common-auth.guard';
import { UserManagementComponent } from './home/user-management/user-management.component';
import { adminAuthGuard } from '../common/auth-guard/admin-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [commonAuthGuard]
  },
   {
    path: 'app-user-management',
    component: UserManagementComponent,
    canActivate: [adminAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
