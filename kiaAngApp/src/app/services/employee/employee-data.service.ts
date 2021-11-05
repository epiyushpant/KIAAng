import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

const baseUrl = "https://localhost:44397/api/employee"

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  
  constructor(private  http : HttpClient) {  
  }

  

  getAll() :  Observable<Employee[]>{

    var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer '  + localStorage.getItem('jwt')});
    console.log(tokenHeader);
    return this.http.get<Employee[]>(baseUrl , {headers: tokenHeader} ); };

  get(id : number) :   Observable<Employee>{
    var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer '  + localStorage.getItem('jwt')});
    return this.http.get<Employee>(`${baseUrl}/${id}`  , {headers: tokenHeader} ); };
     

  create(data: Employee): Observable<any> {
    var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer '  + localStorage.getItem('jwt')});
    const body=JSON.stringify(data);
    return this.http.post(baseUrl, body ,{'headers': tokenHeader});
  }
  
  update(id: number, data: any): Observable<any> {
    var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer '  + localStorage.getItem('jwt')});
    return this.http.put(`${baseUrl}/${id}`, data, {'headers': tokenHeader});
  }

  delete(id: number): Observable<any> {
    var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer '  + localStorage.getItem('jwt')});
    return this.http.delete(`${baseUrl}/${id}` , {'headers': tokenHeader} );
  }

  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }


}
