import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
import { style } from '@angular/animations';
import { note } from '../../../Models/note';
import { AuthService } from '../../../services/auth.service';
import { log } from 'console';
import { format } from 'date-fns/format';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content-calendar.component.html',
  styleUrl: './modal-content-calendar.component.css'
})
export class ModalContentCalendarComponent implements OnInit{
  editEnabled: boolean = false;
  currentEditId: number | null = null;
  cin_med:any;

  toggleEdit(id: number) {
    this.currentEditId = id === this.currentEditId ? null : id;
  }
  
  isEditMode(id: number): boolean {
    return this.currentEditId === id;
  }
  
  

updateNote(id:number,title:string) {
  this.sr.UpdateNote(id,title).subscribe(
    (data) => {
      this.getNotes();
    }
  );
}
/*isEditing?:boolean;
startEdit(note: note) {
  this.isEditing = true;
}

updateNoteTitle(note: note) {
  //this.isEditing = false;
  this.sr.UpdateNote(note).subscribe(
    (data) => {
      this.getNotes();
    }
  );
}

cancelEdit(note: note) {
  this.isEditing = false;
}*/

  noteContent = 'Rédigez votre note...';
onNoteClick() {
 if (this.noteContent === 'Rédigez votre note...') {
      this.noteContent = ''; // Supprime le texte par défaut au clic
    }
}
deleteNote(id: number|null) {
  if(id){
    this.sr.deleteNote(id).subscribe(()=>{
      this.getNotes();
    });
  }
     
}
  newNoteTitle: string = '';
  updateNewNoteTitle(event: any): void {
    this.newNoteTitle = event.target.textContent; // Utiliser textContent pour récupérer le texte sans les balises HTML
  }
  addNewNote(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      
      event.preventDefault();
  
      const newNoteTitle = (event.target as HTMLDivElement).innerText.trim();
     
      if (newNoteTitle !== '') {
        const newNote: note = {
          id: null,
          title: newNoteTitle,
          dateEvent: this.date,
          cin: this.cin_med
        };
  
        this.sr.saveNewNote(newNote).subscribe(() => {
          // Mettre à jour la liste des notes après l'ajout de la nouvelle note
          this.getNotes();
          
          // Effacer le contenu seulement après l'ajout de la note
          (event.target as HTMLDivElement).innerText = '';
        });
      }
    }
  }
  
  


  date?: Date ;
  newDate?:Date;
  formattedDate?:string;
  notes$:Observable<any[]>| null=null;
  constructor(private sr:AuthService){

  }
  getNotes(): void {
    if (this.date) {
      
      this.formattedDate = format(this.date, 'yyyy-MM-dd');
// Affiche la date au format YYYY-MM-DD


      this.notes$ = this.sr.getNotes(this.cin_med,this.formattedDate);
      console.log(this.formattedDate);
    } else {
      // Gérer le cas où this.date est null ou undefined
      // Par exemple, afficher un message d'erreur ou ne pas appeler getNotes du tout
    }
  }
  
  ngOnInit(): void {
    this.getNotes();
     // Appel de getNotes() lors de l'initialisation du composant
  }
  
}
