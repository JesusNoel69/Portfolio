import { Component, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './components/error-page/error-page.component';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet,
    NavbarComponent,
    ContactFormComponent,
    HttpClientModule,
    ErrorPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio-Jesus';
      
  isErrorPage: boolean = false;
  onActivate(component: any): void {
    this.isErrorPage = component instanceof ErrorPageComponent;
  }
  
}

