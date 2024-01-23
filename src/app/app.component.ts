import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LaptopComponent } from './components/laptop/laptop.component';
// TODO: remover este componente y hacer el routing desde contact
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet,
    ProjectsComponent,
    EducationComponent,
    ContactComponent,
    AboutComponent,
    SkillsComponent,
    NavbarComponent,
    LaptopComponent,
    ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio-Jesus';
}
