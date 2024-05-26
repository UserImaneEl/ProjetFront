import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { rdv } from '../../../Models/rdv';
import { ModalNoteComponent } from './modal-note/modal-note.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {

  selectedDate: string = ''; // Date sélectionnée, initialisée à vide
  showDropdown: boolean = false;
  rendezVous: any;
  proposedDateTime: any;
  reformedDte: string = ''; // Format de date modifié
  note: any;
  validationSuccess: boolean = false;
  message:any;
  

  constructor(private router: Router,public activeModal: NgbActiveModal, private sr: AuthService, private modal: NgbModal) { }

  ngOnInit() {
    this.sr.availableDate(this.rendezVous.cin_med).subscribe((response: any) => {
      this.proposedDateTime = response.proposedDateTime;
      this.note = response.message;
      

      // Format the date here
      const dateObj = new Date(this.proposedDateTime);
      const formattedDate = `${dateObj.getFullYear()}-${this.padNumber(dateObj.getMonth() + 1)}-${this.padNumber(dateObj.getDate())}`;
      const formattedTime = `${this.padNumber(dateObj.getHours())}:${this.padNumber(dateObj.getMinutes())}:${this.padNumber(dateObj.getSeconds())}`;
      this.reformedDte = `${formattedDate} at ${formattedTime}`; // Format modifié

      /*if (this.note) {
        const modalRef = this.modal.open(ModalNoteComponent);
        modalRef.componentInstance.note = this.note;
      }*/
    });
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
  openCalendar() {
    // Logique pour ouvrir le calendrier ou le sélecteur de date
    console.log('Ouvrir le calendrier');
    this.activeModal.dismiss();
    this.router.navigateByUrl("calendar/"+this.rendezVous.cin_med);
    
  }
  
  validerRdv() {
    const rdv: rdv = {
      date: this.proposedDateTime,
      cinP: this.rendezVous.cin
    };
    this.sr.validerRdv(this.rendezVous.idRdv, rdv).subscribe(
      (response: any) => {
        // Gérer la réponse ici
        console.log('Réponse de la requête POST :', response);
        
        this.activeModal.dismiss();
      },
      (error: any) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la requête POST :', error);
      }
    );
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
