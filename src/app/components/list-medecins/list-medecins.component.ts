import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-list-medecins',
  templateUrl: './list-medecins.component.html',
  styleUrl: './list-medecins.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ListMedecinsComponent implements OnInit{
openCalendar(cin_med:string) {
  this.router.navigateByUrl("calendar/"+cin_med);
}

  doctors!: any[];
  originalDoctors: any[] = [];
  itemsPerPage:number=9;
  totalPages!:number;
  successMessage: any='';
  message!:string;
  p:number=1;
  noResultsFound: boolean = false;
  searchTerm = new FormControl('');
  filteredOptions!: Observable<any>;



  constructor(
    private router : Router,
    private http: HttpClient,
    private sr:AuthService
  ) {
  }
  ngOnInit(): void {
    this.fetchMedecins();
    searchTerm: new FormControl('');
    this.filteredOptions = this.searchTerm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
    
  fetchMedecins() {
    this.doctors = [];
    this.sr.fetchMedecins()
      .subscribe(
        (data: any[]) => {
          this.originalDoctors = data;
          this.doctors = [...this.originalDoctors];
          this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
          console.log(this.doctors.length);
        },
        (error) => {
          console.error('Error fetching rendezvous:', error);
        }
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
                    this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
                    this.noResultsFound = this.doctors.length === 0;
                    console.log('Résultat de la recherche:', this.doctors); // Message de débogage
                },
                (error) => {
                    console.error('Erreur lors de la recherche de médecin:', error);
                }
            );
    }
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

  removeAlert() {
    this.message = '';

  }
}