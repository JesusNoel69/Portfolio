import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  constructor(private http: HttpClient) {}

  submitData(name: string, message: string): Observable<any> {
    return this.http.post<any>("https://portfolio-backend-lstz.onrender.com/api/DatosForm", { name, message });
  }
}
