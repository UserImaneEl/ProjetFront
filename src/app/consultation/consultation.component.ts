import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { rdvConsult } from '../Models/rdvConsult';
import { consultation } from '../Models/consultation';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent implements OnInit  {
  appointments$?: Observable<rdvConsult[]>|null
  cons?:consultation;
  PatientCin?:string;
  PatientNom?:string;
  PatientPrenom?:string;
  dtoRdv?:rdvConsult;
  selectedAppointmentId: number | null = null;
  consultationFormVisible = false;
  consultationDescription :string='';
  nom_med:any;
  prenom_med:any;
  colors = ['#B08EF2', '#0B8FAC', '#bde4d3']; // Trois couleurs au choix
  constructor(private router: Router,private rs: AuthService, private authService: AuthService 
  ) {}
 

  getRandomColor() {
    console.log("Called!");
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  ngOnInit(): void {
    this.appointments$= this.rs.getRdvDetails(this.authService.username);
    console.log(this.loadAppointments.length);
    this.rs.getMedByUsername().subscribe(data=>{
    this.nom_med=data.nom;
    this.prenom_med=data.prenom;
    });
  }

  loadAppointments(): void {
    
     this.appointments$= this.rs.getRdvDetails("m1");
   
  }

  showConsultationForm(rdvId: number): void {
    this.rs.getPatientDetails(rdvId).subscribe(
      (data: rdvConsult) => {
        // Utilisez le modèle émis (data) comme vous le souhaitez
        console.log(data);
        this.PatientCin=data.cin; 
        this.PatientNom=data.nom;
        this.PatientPrenom=data.prenom;
        // Vous pouvez affecter le modèle à une variable de votre composant si nécessaire
       // this.dtoRdv.cin = data.cin;
        console.log("mn "+this.PatientCin);
      //  this.consultationFormVisible = true;
       
        

      },
      error => {
        console.error(error); // Gérer les erreurs si nécessaire
      }
    ); 
    this.router.navigate(['/create'], { state: { rdvId: rdvId ,PatientCin: this.PatientCin,PatientNom: this.PatientNom,PatientPrenom: this.PatientPrenom}});
    
   
  }

  createConsultation(): void {
    if (this.selectedAppointmentId && this.consultationDescription) {
      if (this.selectedAppointmentId && this.consultationDescription) {
        const consult: consultation = {
          id: this.selectedAppointmentId,
          description: this.consultationDescription,
          dateConsultation: new Date(),
          idM: '',
          idP: ''
        };
        this.consultationFormVisible=false;
        this.rs.createConsultation(consult).subscribe(() => {
          // Mettre à jour la liste des notes après l'ajout de la nouvelle note
          this.loadAppointments();
          this.consultationFormVisible=false;
          this.ngOnInit();
          
      
        });
      }
  }
  }


}