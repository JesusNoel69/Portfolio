import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  images: any[]=[];
  constructor(private http: HttpClient){
    this.http.get<any[]>("/assets/data/skills.json")
    .subscribe(response=>{
      this.images=response;
    });
  }

  selectedImageId: string | null = null;
 
  description:string="";
  changeProperties(event: Event, imageId:string){
    this.selectedImageId = imageId;
    let element = (<HTMLElement>event.target);
    for(let image of this.images){
      if(element.id==image.id){
        this.description=image.description;
      }
    }
  }
}
