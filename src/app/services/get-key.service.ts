import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetKeyService {

  constructor(private client: HttpClient) { }
  key : string="https://www.google.com/maps/embed/v1/place?q=cudad%20juarez%2C%20fronteiza%20baja&key=";
  public getApiKey(){
    this.client.get<string>("https://portfolio-backend-lstz.onrender.com/api/DatosForm", {responseType: "json"}).subscribe({
      next:response=>{this.key+=response.toString()},
      error:error=>{return error;}
    });
    
    return this.key;
  }

}
