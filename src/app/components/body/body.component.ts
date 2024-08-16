import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { EducationComponent } from '../education/education.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { HttpClientModule } from '@angular/common/http';
import { FadeInDirective } from '../directives/fade-in.directive';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [AboutComponent,
    ContactComponent,
    EducationComponent,
    ProjectsComponent,
    SkillsComponent,
    HttpClientModule,
    FadeInDirective],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
