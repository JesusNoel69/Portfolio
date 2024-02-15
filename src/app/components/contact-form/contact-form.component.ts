import { Component, Injectable} from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Router} from '@angular/router';
import { SendFormService } from '../../services/send-form.service';
import { HttpClientModule } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

export class ContactFormComponent {
  constructor(private router:Router, private sendData:SendFormService){
    
  }
  name:string="";
  message:string="";

  submitForm(formData: NgForm) {
    this.name = formData.value.name;
    this.message = formData.value.message;
    this.sendData.submitData(this.name, this.message);
  }
}
