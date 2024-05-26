import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Departement, inscription } from '../../Models/AjoutMed';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-ajou-med',
  templateUrl: './ajou-med.component.html',
  styleUrl: './ajou-med.component.css'
})
export class AjouMedComponent implements OnInit{
  departements$: Observable<Departement[]> | undefined;
  inscriptionForm !: FormGroup;
  userValid: boolean = false;
  cinValid: boolean = false;
  randomString: string="";
  validEmail: boolean = true;
  inscrit?:inscription;
  constructor(private fb: FormBuilder,
    private rs:AuthService,
    private router: Router,
    private http: HttpClient) {
 }
  ngOnInit(): void {
    console.log("dkhl")
    this.departements$=this.rs.getDep();
    this.inscriptionForm = this.fb.group({
      cin: ['', Validators.required],
      nom: ['',],
      prenom: ['', ],
      tel: ['', Validators.required],
      dateN: ['',],
      adresse: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      specialite: ['', ],
      departement: ['', ]
      // vous devrez peut-être définir des validateurs spécifiques pour ce champ
    });
    
  }
  checkDuplicateUsername() {
    console.log("check username")
    const username = this.inscriptionForm.get('username')?.value;
    this.rs.checkDuplicateUsername(username).subscribe((exists: boolean) => {
      if (exists) {
        this.userValid=true;
        this.inscriptionForm.get('username')?.setErrors({ duplicateUsername: true });
      }
      else{
        this.userValid=false;
      }
    });
    console.log(this.userValid)
  }

  checkDuplicateCin() {
    console.log("check cin")
    const username = this.inscriptionForm.get('cin')?.value;
    this.rs.checkDuplicateCin(username).subscribe((exists: boolean) => {
      if (exists) {
        this.cinValid=true;
        this.inscriptionForm.get('cin')?.setErrors({ duplicateUsername: true });
      }
      else{
        this.cinValid=false;
      }
    });
    console.log(this.userValid)
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@+-';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  checkEmail() {
    const emailControl = this.inscriptionForm.get('email');
    if (emailControl) {
      const email = emailControl.value;
      if (email && !email.includes('@')) {
        console.log("mahoach")
        this.validEmail=false
        emailControl.setValue(email); // Définir la valeur de l'e-mail pour déclencher les validations
        emailControl.setErrors({ 'invalidEmail': true }); // Définir les erreurs du formulaire
      }
      else{
        this.validEmail=true;
      }
    }
  }
  Ajouter() {
    this.inscrit=this.inscriptionForm.value;
    if(this.inscrit){
      this.inscrit.mdp=this.generateRandomString(10);
      console.log("mdp"+this.inscrit.mdp)
      this.http.post<void>("http://localhost:8080/compteMed", this.inscrit)
    .subscribe(
      () => {
        console.log("La demande a été envoyée avec succès !");
       // this.router.navigate(['/verifMed'], { state: { inscrit: this.inscrit } });
        
      },
      (error) => {
        console.error("Une erreur s'est produite lors de l'envoi de la demande :", error);
      }
    );
    }

    
    
}

}