import { Component, OnInit, Sanitizer} from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Router} from '@angular/router';
import { SendFormService } from '../../services/send-form.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GetKeyService } from '../../services/get-key.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { sanitizeIdentifier } from '@angular/compiler';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent{
  constructor(private getApiKeyService: GetKeyService, private sanitizer: DomSanitizer, private sendData: SendFormService) { 
    this.key = this.sanitizer.bypassSecurityTrustResourceUrl(this.getApiKeyService.getApiKey());//santiza la url
  }

  name:string="";
  message:string="";
  key:SafeResourceUrl="";
  
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
  getKey(){
    return this.key;
  }
  isNotKey(){
    return this.key=="SafeValue must use [property]=binding: https://www.google.com/maps/embed/v1/place?q=cudad%20juarez%2C%20fronteiza%20baja&key= (see https://g.co/ng/security#xss)";
  }
}
