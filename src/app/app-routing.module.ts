import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { StudentGuard } from './guards/student.guard';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestpageComponent } from './components/testpage/testpage.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: "signup", component: SignupComponent, pathMatch: 'full' },
  { path: "admin", component: AdminComponent, pathMatch: 'full', canActivate: [AuthGuard, AdminGuard] },
  { path: "admin/users", component: UsersListComponent, pathMatch: 'full', canActivate: [AuthGuard, AdminGuard] },
  { path: "admin/create", component: CreateTestComponent, pathMatch: 'full', canActivate: [AuthGuard, AdminGuard] },
  { path: "dashboard", component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard, StudentGuard] },
  { path: "test/:id", component: TestpageComponent, pathMatch: 'full', canActivate: [AuthGuard, StudentGuard] },
  { path: "profile", component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: "**", redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard, StudentGuard]
})
export class AppRoutingModule { }
