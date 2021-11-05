import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeDataService } from 'src/app/services/employee/employee-data.service';
import { ImageUploadService } from 'src/app/services/ImageUpload/image-upload.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    fullName: '',
    dob: '',
    gender:'male',
    salary: undefined,
    designation : '' ,
    imageSrc: ''
  };
  submitted = false;
  //selectedFile: File | any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos ?: Observable<any>;

  constructor( private employeeDataService: EmployeeDataService , private http : HttpClient , private ImageUploadService : ImageUploadService ) { }

  ngOnInit(): void {

    this.fileInfos = this.ImageUploadService.getFiles();
  }


  saveEmployee(): void {
    const data = {
      fullName: this.employee.fullName,
      dob: this.employee.dob,
      gender: this.employee.gender,
      salary : this.employee.salary, 
      designation : this.employee.designation,
      imageSrc:this.employee.imageSrc
    };
    console.log(data);

    this.employeeDataService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
      }

      // onFileChange(event:any) {
      //   const reader = new FileReader();
        
      //   if(event.target.files && event.target.files.length) {
      //     const [file] = event.target.files;
      //     reader.readAsDataURL(file);
        
      //     reader.onload = () => {
       
      //       this.imageSrc = reader.result as string;
         
      //       this.data.patchValue({
      //         fileSource: reader.result
      //       });
       
      //     };
       
      //   }
      // }

      // submit(){
      //   console.log(this.myForm.value);
      //   this.http.post('http://localhost:8001/upload.php', this.myForm.value)
      //     .subscribe(res => {
      //       console.log(res);
      //       alert('Uploaded Successfully.');
      //     })
      // }




  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }
 
  // upload(): void {
  //   this.progress = 0;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
  //       this.currentFile = file;

  //       this.ImageUploadService.upload(this.currentFile).subscribe(
  //         (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round(100 * event.loaded / event.total);
  //           } else if (event instanceof HttpResponse) {
  //             this.message = event.body.message;
  //             this.fileInfos = this.ImageUploadService.getFiles();
  //           }
  //         },
  //         (err: any) => {
  //           console.log(err);
  //           this.progress = 0;

  //           if (err.error && err.error.message) {
  //             this.message = err.error.message;
  //           } else {
  //             this.message = 'Could not upload the file!';
  //           }

  //           this.currentFile = undefined;
  //         });

  //     }

  //     this.selectedFiles = undefined;
  //   }
  // }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      fullName: '',
      dob: '',
      gender: '',
      salary : undefined, 
      designation : ''
    };
  }

}
