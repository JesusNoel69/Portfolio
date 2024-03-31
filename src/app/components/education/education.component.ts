import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  info : any[]=[];
  constructor(private http: HttpClient){
    this.http.get<any[]>("../assets/data/education.json")
    .subscribe({
      next : response =>{
        this.info=response;
      }
    });
  }
}
