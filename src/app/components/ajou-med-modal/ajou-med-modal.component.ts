import { Component, OnInit } from '@angular/core';
import { inscription } from '../../Models/AjoutMed';


@Component({
  selector: 'app-ajou-med-modal',
  templateUrl: './ajou-med-modal.component.html',
  styleUrl: './ajou-med-modal.component.css'
})
export class AjouMedModalComponent implements OnInit{
  inscrit?:inscription;
  ngOnInit(): void {
    const state = history.state;
    if (state) {
      this.inscrit = state.inscrit;
      
      console.log("Données récupérées avec succès :", this.inscrit);
    } else {
      console.log("Aucune donnée trouvée dans l'état de l'historique de navigation.");
}
}

}