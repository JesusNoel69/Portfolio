import { Component } from '@angular/core';
import { LaptopComponent } from '../laptop/laptop.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LaptopComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
