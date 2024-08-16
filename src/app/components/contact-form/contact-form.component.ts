import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SendFormService } from '../../services/send-form.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GetKeyService } from '../../services/get-key.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  name: string = "";
  message: string = "";
  key: SafeResourceUrl = "";
  showPopover: boolean = false;
  popoverMessage: string = "";
  popoverSuccess: boolean = false;

  constructor(private getApiKeyService: GetKeyService, private sanitizer: DomSanitizer, private sendData: SendFormService) {
    this.key = this.sanitizer.bypassSecurityTrustResourceUrl(this.getApiKeyService.getApiKey());
  }

  reduceSizeButtonClicked(event: Event) {
    (<HTMLInputElement>event.target).style.scale = "0.97";
  }

  growSizeButtonClicked(event: Event) {
    (<HTMLInputElement>event.target).style.scale = "1";
  }

  submitForm(formData: NgForm) {
    this.name = formData.value.name;
    this.message = formData.value.message;
    
    this.sendData.submitData(this.name, this.message).subscribe({
      next: response => {
        this.popoverMessage = "Formulario enviado con éxito.";
        this.popoverSuccess = true;
        this.showPopover = true;
      },
      error: error => {
        this.popoverMessage = "Error al enviar el formulario.";
        this.popoverSuccess = false;
        this.showPopover = true;
      }
    });
  }

  getKey() {
    return this.key;
  }

  isNotKey() {
    return this.key == "SafeValue must use [property]=binding: https://www.google.com/maps/embed/v1/place?q=cudad%20juarez%2C%20fronteiza%20baja&key= (see https://g.co/ng/security#xss)";
  }
}
