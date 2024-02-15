import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { EducationComponent } from '../education/education.component';
import { LaptopComponent } from '../laptop/laptop.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [AboutComponent,
    ContactComponent,
    EducationComponent,
    LaptopComponent,
    ProjectsComponent,
    SkillsComponent,
  HttpClientModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
