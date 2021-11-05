import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeDataService } from 'src/app/services/employee/employee-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {


  currentEmployee: Employee = {
    id:'',
    fullName: '',
    dob: '',
    gender: '',
    salary : undefined,
    designation : ''
  };

  
  imageSrc: string | undefined;
  myForm = new FormGroup({
  fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  dob: new FormControl('', [Validators.required]),
  gender: new FormControl('', [Validators.required]),
  salary:  new FormControl('', [Validators.required]),
  designation : new FormControl('', [Validators.required]),
  file: new FormControl('', [Validators.required]),
  fileSource: new FormControl('', [Validators.required])
  });

 // currentEmployee: Employee | any;
  message = '';

  constructor(private employeeService: EmployeeDataService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getEmployee(this.route.snapshot.params.id);
  }


  get f(){
    return this.myForm.controls;
  }
   
  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.myForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
   
  updateEmployee(){
    console.log(this.myForm.value);
    this.http.put('https://localhost:44397/api/employee', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  getEmployee(id: number): void {
    this.employeeService.get(id)
      .subscribe(
        (res:Employee) => {
            this.myForm.patchValue({   
            fullName: res.fullName,
            dob: res.dob,
            gender: res.gender,
            salary: res.salary,
            designation: res.designation          
          });

        },
        error => {
          console.log(error);
        });
  }

  // updateemployee(status: boolean): void {
  //   const data = {
  //     fullName: this.currentEmployee.fullName,
  //     dob: this.currentEmployee.dob,
  //     gender: this.currentEmployee.gender,
  //     salary: this.currentEmployee.salary,
  //     designation: this.currentEmployee.designation

  //   };

  //   this.message = '';

  //   this.employeeService.update(this.currentEmployee.id, data)
  //     .subscribe(
  //       response => {
  //         //this.currentEmployee.published = status;
  //         console.log(response);
  //         this.message = response.message ? response.message : 'The status was updated successfully!';
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // updateEmployee(): void {
  //   this.message = '';

  //   this.employeeService.update(this.currentEmployee.id, this.currentEmployee)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         //this.message = response.message ? response.message : 'This employee was updated successfully!';
  //         this.message = 'This employee was updated successfully!';

  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }

}
