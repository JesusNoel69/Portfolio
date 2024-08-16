import { Component, Input} from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);    
    if (element) {
      const navbarHeight = 60;
      const offsetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return false;
    }
    return true;
  }
  @Input() showNavbar: boolean;
}