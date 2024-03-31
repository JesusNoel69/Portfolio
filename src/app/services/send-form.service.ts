import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SendFormService{

constructor(private http: HttpClient) {
}
submitData(name: string, message: string) {
  //console.log(name + ' ' + message);
  this.http.post<any>("http://localhost:5018/api/DatosForm", { name: name, message : message })//, { headers }
      .subscribe({
          next: response => { console.log(response) },
          error: error => console.log(error)
      });
  }
}