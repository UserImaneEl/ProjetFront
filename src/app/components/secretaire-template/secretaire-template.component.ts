import {Component, NgIterable, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
@Component({
  selector: 'app-secretaire-template',
  templateUrl: './secretaire-template.component.html',
  styleUrls: ['./secretaire-template.component.css']
})
export class SecretaireTemplateComponent implements OnInit {
  preventModal(event: Event) {
    event.stopPropagation(); // Empêche la propagation de l'événement de clic vers le parent
  }
  
ignorerFct() {
   console.log("sedqaaat");
}
  colors = ['#B08EF2', '#0B8FAC', '#bde4d3']; 
  getRandomColor() {
    console.log("Called!");
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
  rendezVousList!: any[];
  private loading!: boolean;
  username!: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private modal:NgbModal
  ) {}
  ngOnInit(): void {
    this.fetchRendezVous();
  }

  openModal(rdv: any) {
    const modalRef = this.modal.open(ModalContentComponent);
    modalRef.componentInstance.rendezVous = rdv;
    modalRef.result.then(
      (result) => {
        // La modal est fermée avec un résultat (result)
        this.handleModalClose(); // Appel de la méthode handleModalClose lors de la fermeture de la modal
      },
      (reason) => {
        // La modal est fermée avec une raison (reason)
        this.handleModalClose(); // Appel de la méthode handleModalClose lors de la fermeture de la modal
      }
    );
  }
  // Dans SecretaireTemplateComponent
handleModalClose() {
  this.fetchRendezVous(); // Appel de la méthode fetchRendezVous lors de la fermeture de la modal
}

  nbr:any;
  count() {
  this.authService.countDem().subscribe(data=>{
    this.nbr=data;
  })
  }
  
  fetchRendezVous() {
    this.username = this.authService.username;
    this.rendezVousList = []; // Clear the existing list
    this.loading = true;
    
    this.authService.fetch().subscribe({
      next: (data: any[]) => {
        this.rendezVousList = data;
        console.log(data);
        this.loading = false;
      },
      error: (error) => {
        //console.error('Error fetching rendezvous:', error);
        this.loading = false;
      },
      complete: () => {
        // Optionally handle completion here
      }
    });
  
  
  }

  logout() {
this.authService.Logout() }
}
