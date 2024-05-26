import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { log } from 'console';
import { AuthService } from '../services/auth.service';
import { consultation } from '../Models/consultation';
import { rdvConsult } from '../Models/rdvConsult';

@Component({
  selector: 'app-create-consultation',
  templateUrl: './create-consultation.component.html',
  styleUrl: './create-consultation.component.css'
})
export class CreateConsultationComponent implements OnInit{
  rdvId: number=0;
  PatientCin?:string;
  PatientNom?:string;
  PatientPrenom?:string;
  dtoRdv?:rdvConsult;
  consultationDescription :string='';
  constructor(private router: Router,private rs: AuthService
  ) {}
  ngOnInit(): void {
    const state = history.state;
    if (state) {
      this.rdvId = state.rdvId;
    
      console.log("Données récupérées avec succès :", this.rdvId);
    } else {
      console.log("Aucune donnée trouvée dans l'état de l'historique de navigation.");
    }
    this.rs.getPatientDetails(this.rdvId).subscribe(
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
  }

  createConsultation(): void {
    console.log("ici"+this.rdvId)
    if (this.rdvId && this.consultationDescription) {
  
        const consult: consultation = {
          id: this.rdvId,
          description: this.consultationDescription,
          dateConsultation: new Date(),
          idM: '',
          idP: ''
        };
       
        this.rs.createConsultation(consult).subscribe(() => {
          // Mettre à jour la liste des notes après l'ajout de la nouvelle note
          console.log(this.consultationDescription);
          this.router.navigate(['/consult']);
          this.ngOnInit();
          
      
        });
    
}
}


}