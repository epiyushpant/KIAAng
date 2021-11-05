import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kiaAngApp';
   auth =false; 
  constructor(private jwtHelper: JwtHelperService , private router : Router) { }

  ngOnInit(): void {
     this.auth =  this.isUserAuthenticated();
     if(this.auth ==false ) 
     {
        this.router.navigate(["login"]);
     }
  }

  isUserAuthenticated(){
    const token : any = localStorage.getItem("jwt");
  
    if (token && !this.jwtHelper.isTokenExpired(token)) {
    return true; 
    }
    else{
    return false; 
  
    }
  }

}


