import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './components/add-employees/add-employees.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [

  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent  , canActivate : [AuthGuardService]},
  { path: 'employees/:id', component: EmployeeDetailsComponent,  canActivate : [AuthGuardService] },
  { path: 'file', component: FileUploadComponent ,  canActivate : [AuthGuardService]},
  { path: 'add', component: AddEmployeesComponent ,  canActivate : [AuthGuardService] },
  {
    component : HomeComponent, 
    path: 'home' , 
    canActivate : [AuthGuardService]
  },

  {
    component : LoginComponent, 
    path: 'login'
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
