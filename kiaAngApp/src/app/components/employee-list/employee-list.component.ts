import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from 'src/app/services/employee/employee-data.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees : any ; 
  fullName : string ="" ;
  designation : string ="";
  fromDate : string ="";
  toDate : string ="";
  fromSalary : number =0;
  toSalary : number =0;
  gender : string= "";
  p: number =1 ;
  constructor(private employeeData : EmployeeDataService ) { 

  }

  ngOnInit(): void {
    this.employeeData.getAll().subscribe((data: any)=> {
      console.log(data);
      this.employees = data; 
    })
  }

  search(){
  
   if(this.fullName == ""){
     this.ngOnInit();
   }
   else{
     this.employees =  this.employees.filter((emp: { fullName: string; }) => 
     {
       return emp.fullName.toLocaleLowerCase().match(this.fullName.toLocaleLowerCase()) ;
     })
   }
  }

  
  searchDOB(){
  
    if(this.fromDate == "" && this.toDate ==""){
      this.ngOnInit();
    }
    else  if(this.fromDate != "" && this.toDate !="" ){
      this.employees =  this.employees.filter((emp: { dob : string; }) => 
      {
        return emp.dob >= this.fromDate && emp.dob <= this.toDate ;
      })
    }
    else if(this.fromDate != "" && this.toDate =="" )
    {
      this.employees =  this.employees.filter((emp: { dob : string; }) => 
      {
        return emp.dob >= this.fromDate ;
      })
    }
    else {
      this.employees =  this.employees.filter((emp: { dob : string; }) => 
      {
        return emp.dob <= this.toDate ;
      })
    }
   }


   searchSalary(){
  
    if(this.fromSalary == 0 && this.toSalary ==0){
      this.ngOnInit();
    }
    else  if(this.fromSalary != 0 && this.fromSalary !=0 ){
      this.employees =  this.employees.filter((emp: { salary : number; }) => 
      {
        return emp.salary >= this.fromSalary && emp.salary <= this.toSalary ;
      })
    }
    else if(this.fromDate != "" && this.toDate =="" )
    {
      this.employees =  this.employees.filter((emp: { salary : number; }) => 
      {
        return emp.salary >= this.fromSalary ;
      })
    }
    else {
      this.employees =  this.employees.filter((emp: { salary : number; }) => 
      {
        return emp.salary <= this.toSalary ;
      })
    }
   }


  searchDesignation(){
  
    if(this.designation == ""){
      this.ngOnInit();
    }
    else{
      this.employees =  this.employees.filter((emp: { designation: string; }) => 
      {
        return emp.designation.toLocaleLowerCase().match(this.designation.toLocaleLowerCase()) ;
      })
    }
   }
 

   searchGender(){
  
    if(this.gender == ""){
      this.ngOnInit();
    }
    else{
      this.employees =  this.employees.filter((emp: { gender: string; }) => 
      {
        return emp.gender.toLocaleLowerCase().match(this.gender.toLocaleLowerCase()) ;
      })
    }
   }

  key : string  ='importedDate' ; 
  reverse: boolean = false ; 
  sort(key : string){
    this.key = key ; 
    this.reverse = !this.reverse; 
  }

}
