import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeDataService } from 'src/app/services/employee/employee-data.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

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


  constructor(private http : HttpClient, private employeeService: EmployeeDataService ) { }

  ngOnInit(): void {
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
   
  submit(){
    console.log(this.myForm.value);
    this.employeeService.create(this.myForm.value).subscribe(res => {
      console.log(res);
      alert('Uploaded Successfully.');
    })

  
  }

}
