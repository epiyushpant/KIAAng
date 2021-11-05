import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl ="https://localhost:44397/api/ExcelUpload";
  constructor(private http : HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer '  + localStorage.getItem('jwt')});
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, 
     formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    var tokenHeader = new HttpHeaders({'Authorization' : 'Bearer '  + localStorage.getItem('jwt')});
    return this.http.get(`${this.baseUrl}/files` ,  {headers: tokenHeader} );
  }
}
