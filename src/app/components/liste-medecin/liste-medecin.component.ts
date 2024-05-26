import {Component, NgIterable, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {limitRDVguard} from "../../guards/limitRDV.guard";

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { rename } from 'fs';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-liste-medecin',
  templateUrl: './liste-medecin.component.html',
  styleUrl: './liste-medecin.component.css'
})
export class ListeMedecinComponent implements OnInit {

  doctors:any[] =[];
  nom_conn:any;
  prenom_conn:any;
  images: { [cin: string]: string } = {}
  originalDoctors: any[] = [];
  
  searchTerm = new FormControl('');
  filteredOptions!: Observable<any>;
  deptNames: any;

  constructor(private sr:AuthService,private http:HttpClient){

  }
 
  ngOnInit(): void {
    this.sr.getInfos().subscribe(data=>{
      this.nom_conn=data.nom;
      this.prenom_conn=data.prenom;
    }

    )
    this.sr.fetchMedecinsAdmin().subscribe((data: any[]) => {
      this.fetchMedecins();
      searchTerm: new FormControl('');
      this.filteredOptions = this.searchTerm.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      
      
      // Charger les images pour chaque médecin
     
    });
  }

  loadImages(): void {
    this.doctors.forEach(doctor => {
      this.http.get('http://localhost:8080/getImage/' + doctor.cin, { responseType: 'blob' }).subscribe((data: Blob) => {            
        const reader = new FileReader();
        reader.onload = () => {
          this.images[doctor.cin] = reader.result as string; // Stocker l'image avec la clé cin
        };
        reader.readAsDataURL(data);             
      });
    });
  }
    
  fetchMedecins() {
    this.doctors = [];
    this.sr.fetchMedecinsAdmin()
      .subscribe(
        (data: any[]) => {
          this.originalDoctors = data;
          this.doctors = [...this.originalDoctors];
          this.loadImages(); // Charger les images après avoir récupéré les données des médecins
          console.log(this.doctors.length);
        },
        (error) => {
          console.error('Error fetching rendezvous:', error);
        }
      );
  }
  
  private _filter(value: string | null): any[] {
    if (!value) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.originalDoctors.filter(doctor =>
      doctor.nom.toLowerCase().startsWith(filterValue) || doctor.prenom.toLowerCase().startsWith(filterValue)
    );
  }
  searchMedecin() {
    const fullName = this.searchTerm.value;
    console.log('Nom de recherche:', fullName); // Message de débogage
    if (fullName) {
        const nom = fullName.split(' ')[1]; 
        console.log('Nom extrait:', nom); // Message de débogage
        this.http.get<any[]>('http://localhost:8080/medecins/'+nom)
            .subscribe(
                (data: any[]) => {
                    this.doctors = data;
                  
                    console.log('Résultat de la recherche:', this.doctors); // Message de débogage
                },
                (error) => {
                    console.error('Erreur lors de la recherche de médecin:', error);
                }
            );
    }
}
fetchAllDepts() {
  this.http.get<any>('http://localhost:8080/getAllDept').subscribe(
    (response) => {
      console.log(response);
      this.deptNames = response;
    },
    (error) => {
      console.error('Error fetching departments:', error); // Log the error for debugging
    }
  );
}

onClickOption(dept: any) {
  this.http.get<any>('http://localhost:8080/doctorByDept/'+dept).subscribe(
      (response)=>{
        this.doctors = response;
      },
      (error) => {
        console.error('Error fetching departments:', error); // Log the error for debugging
 }
);
}
  
}