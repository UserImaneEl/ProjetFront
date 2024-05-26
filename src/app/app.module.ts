import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { SecretaireTemplateComponent } from './components/secretaire-template/secretaire-template.component';
import { ListeMedecinComponent } from './components/liste-medecin/liste-medecin.component';
import { ListeRDVComponent } from './components/liste-rdv/liste-rdv.component';
import { PatientRDVComponent } from './components/patient-rdv/patient-rdv.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './components/secretaire-template/modal-content/modal-content.component';
import { ModalNoteComponent } from './components/secretaire-template/modal-content/modal-note/modal-note.component';
import { CardBoxComponent } from './components/card-box/card-box.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalContentCalendarComponent } from './components/calendar-component/modal-content-calendar/modal-content-calendar.component';
import { CalendarComponentComponent} from './components/calendar-component/calendar-component.component';
import { ListMedecinsComponent } from './components/list-medecins/list-medecins.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MedecinTemplateComponent } from './medecin-template/medecin-template.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { CreateConsultationComponent } from './create-consultation/create-consultation.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import {MatMenuModule} from "@angular/material/menu";
import { AddPatientComponent } from './components/add-patient-component/add-patient-component.component';
import { AjouMedComponent } from './components/ajou-med/ajou-med.component';
import { AjouMedModalComponent } from './components/ajou-med-modal/ajou-med-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminTemplateComponent,
    SecretaireTemplateComponent,
    ListeRDVComponent,
    ListeMedecinComponent,
    PatientRDVComponent,
    SidebarComponent,
    ModalContentComponent,
    ModalNoteComponent,
    CardBoxComponent,
    ModalContentCalendarComponent,
   CalendarComponentComponent,

   ListMedecinsComponent,
   MedecinTemplateComponent,
   ConsultationComponent,
   CreateConsultationComponent,
   TestComponent,
   ProfileComponent,
   AddPatientComponent,
   AjouMedComponent,
   AjouMedModalComponent
   
   
    
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      NgbModalModule,
      FormsModule,
      CalendarModule.forRoot({provide : DateAdapter, useFactory:adapterFactory}),
      CommonModule,
      BrowserAnimationsModule,
      NgxPaginationModule,
      MatInputModule,
      MatAutocompleteModule,
      MatInputModule,
      MatMenuModule
      
    ],
  providers: [
    provideClientHydration(),
    {provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
