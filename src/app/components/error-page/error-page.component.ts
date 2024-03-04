import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent{}