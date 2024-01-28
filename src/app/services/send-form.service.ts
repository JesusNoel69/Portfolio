import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class SendFormService{

constructor(private http: HttpClient) {
}
  submitData(data:NgForm){
    this.http.post<any>("http://localhost:5074",data.value.name)
    .subscribe({
      next:response=>{console.log(response)},
      error: error=>console.log(error)}
    );
  }  
}

