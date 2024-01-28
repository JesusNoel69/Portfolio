import { Component, Injectable} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router} from '@angular/router';
import { SendFormService } from '../../services/send-form.service';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
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
  submitForm(formData: any) {
    const name=formData.value.name;
    console.log(name);
    this.sendData.submitData(formData);
  }
}
