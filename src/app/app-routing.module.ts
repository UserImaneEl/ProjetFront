import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AdminTemplateComponent} from "./components/admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {SecretaireTemplateComponent} from "./components/secretaire-template/secretaire-template.component";
import {ListeRDVComponent} from "./components/liste-rdv/liste-rdv.component";
import {ListeMedecinComponent} from "./components/liste-medecin/liste-medecin.component";
import {limitRDVguard} from "./guards/limitRDV.guard";
import {PatientRDVComponent} from "./components/patient-rdv/patient-rdv.component";
import { CalendarComponentComponent } from './components/calendar-component/calendar-component.component';

import { ListMedecinsComponent } from './components/list-medecins/list-medecins.component';
import { MedecinTemplateComponent } from './medecin-template/medecin-template.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { CreateConsultationComponent } from './create-consultation/create-consultation.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import { AjouMedComponent } from './components/ajou-med/ajou-med.component';
import { AjouMedModalComponent } from './components/ajou-med-modal/ajou-med-modal.component';
import { AddPatientComponent } from './components/add-patient-component/add-patient-component.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path : "patientRDV", component : PatientRDVComponent},

  { path: "SEC", component: SecretaireTemplateComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { role: "SECRETAIRE" } },
  { path: "priseRDV", component: ListeRDVComponent, canActivate: [AuthenticationGuard,limitRDVguard]},
  {path:"listMed",component:ListeMedecinComponent},
  {path : "", redirectTo : "/login", pathMatch :"full"},//admin/listeRdv chkl la route (child component) et necessite un authenitification
  {path : "admin", component : AdminTemplateComponent ,canActivate : [AuthenticationGuard] ,children : [
  //{path :"listeRDV" ,component : ListeRdvComponent,canActivate : [AuthorizationGuard],data : {role:"ADMIN"}},
 /* {path :"custoner-accounts/:id" ,component : CustomerAccountsComponenth},*/]},
 {path:"calendar/:cin_med",component:CalendarComponentComponent},
 {path:"addPatient",component:AddPatientComponent},
 {path:"medecins",component:ListMedecinsComponent},
 {path:"MED",component:MedecinTemplateComponent},
 {path : "consult", component : ConsultationComponent},
 {path : "create", component : CreateConsultationComponent},
 {path : "test", component : TestComponent},
 {path : "profile", component : ProfileComponent},
 {path : "adminMed", component : ListeMedecinComponent},
 {path : "ajou" , component: AjouMedComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { role: "ADMIN" } },
  {path : "verifMed", component : AjouMedModalComponent, canActivate: [AuthenticationGuard, AuthorizationGuard], data: { role:"ADMIN"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
