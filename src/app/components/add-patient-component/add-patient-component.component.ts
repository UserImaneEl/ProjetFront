import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { patient } from '../../Models/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient-component.component.html',
  styleUrl: './add-patient-component.component.css'
})
export class AddPatientComponent implements OnInit{



  constructor(private fb: FormBuilder,private rendezVousService : AuthService){}
 FormGroup?: FormGroup;
  ngOnInit(): void {
    this.FormGroup = this.fb.group({
      cin: ['',Validators.required],
      nom: ['',Validators.required],
      prenom: ['', Validators.required],
      tel: [ ,Validators.required],
      mail: ['',Validators.required],
      ad: ['',Validators.required],
      nomPrMed: ['',Validators.required],
      date:[Validators.required],
    });
  }

  onSubmit() {
   
    
    this.rendezVousService.ajouterRDV(this.FormGroup?.value).subscribe(
      (response: any) => {
        console.log('Rendez-vous créé avec succès !');
        // Réinitialiser le formulaire ou effectuer d'autres actions après la création du rendez-vous
      },
      (error: any) => {
        console.error('Erreur lors de la création du rendez-vous :', error);
        // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
      }
);
}}