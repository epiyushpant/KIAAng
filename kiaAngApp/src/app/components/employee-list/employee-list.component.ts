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

  key : string  ='importedDate' ; 
  reverse: boolean = false ; 
  sort(key : string){
    this.key = key ; 
    this.reverse = !this.reverse; 
  }

}
