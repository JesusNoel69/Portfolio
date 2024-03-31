import { Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { BodyComponent } from './components/body/body.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
    {path:'', component:BodyComponent},
    {path:'contact-form', component:ContactFormComponent},
    {path:'**', component:ErrorPageComponent}
];
