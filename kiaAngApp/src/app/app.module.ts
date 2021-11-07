import { NgModule } from '@angular/core';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http' ;
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatIconModule} from '@angular/material/icon';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component'; 
import { EmployeeDataService } from './services/employee/employee-data.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddEmployeesComponent } from './components/add-employees/add-employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FileUploadComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    AddEmployeesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FlexLayoutModule,
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     MatCardModule,
     MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BsDatepickerModule.forRoot(),
    // RouterModule.forRoot([
    //   { path: 'home', component: HomeComponent },
    //   { path: 'employee', service: EmployeeDataService , canActivate :[AuthGuardService] },
    //   { path: 'login', component: LoginComponent },
    //   //{ path: 'customers', component: CustomerComponent , canActivate: [  ]   },
    // ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4000"],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule,
    NgbModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],

  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }



