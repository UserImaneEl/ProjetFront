import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { onErrorResumeNextWith } from 'rxjs';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  nom_conn:any;
  prenom_conn:any;
  cin_conn:any;
logout() {
this.rendezVousService.Logout();
}
  

versAddPatient() {
  this.router.navigateByUrl("/addPatient");
  
}
   
  sidebarActive=false;
  nbr:any;
  countWhenSec:any;
  countWhenMed:any;

  constructor(private router:Router,public rendezVousService: AuthService) { }
  
  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  ngOnInit(): void {
    this.rendezVousService.getInfos().subscribe(data=>{
       this.nom_conn=data.nom;
       
       this.prenom_conn=data.prenom;
       console.log(this.nom_conn);
       console.log(this.prenom_conn);
    
    });
    this.rendezVousService.countDem().subscribe(data=>{
          this.countWhenSec=data;
    });
    this.rendezVousService.countRdvOfMedByDay().subscribe({
      next: data => {
        this.countWhenMed = data;
       
        console.log(this.countWhenMed);
      },
      error: err => {
        console.error('Une erreur s\'est produite :', err);
      }
    });
    this.rendezVousService.getInfos().subscribe({
      next: data => {
        this.cin_conn = data.cin;
       console.log("ana hnaaaaaaaaaaaaaaaaaaa");
      
      },
      error: err => {
        console.error('Une erreur s\'est produite hnaaaaa :', err);
      }
    });
     
  }

  
}

function next(value: any): void {
  throw new Error('Function not implemented.');
}
