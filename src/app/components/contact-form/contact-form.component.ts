import { Component} from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Router} from '@angular/router';
import { SendFormService } from '../../services/send-form.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



// @Injectable({
//   providedIn: 'root'
// })
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

export class ContactFormComponent {
  constructor(private router:Router, private sendData:SendFormService){
    
  }
  name:string="";
  message:string="";
  buttonStyle:HTMLInputElement;
  reduceSizeButtonClicked(event : Event){

      (<HTMLInputElement>event.target).style.scale="0.97";
  }
  growSizeButtonClicked(event : Event){
      (<HTMLInputElement>event.target).style.scale="1";
  }
  submitForm(formData: NgForm) {
    this.name = formData.value.name;
    this.message = formData.value.message;
    this.sendData.submitData(this.name, this.message);
  }
}
