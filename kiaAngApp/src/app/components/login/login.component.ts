import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http' ; 
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: '/login.component.html',
  styleUrls: ['/login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean  = false ; 

  constructor(private router : Router , private http : HttpClient ) { }

  ngOnInit(): void {
  }


  login(form: NgForm) {

    const credentials  =  {
    'Username' : form.value.username,
    'Password' : form.value.password    
    }


    this.http.post("https://localhost:44397/login", credentials).subscribe(response => {
      const token = (<any>response).token;
      //console.log(response
     console.log(token); 
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/home"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

}
