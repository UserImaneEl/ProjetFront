import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { personne } from '../Models/personne';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedecinTemplateComponent } from '../medecin-template/medecin-template.component';
import { medecin } from '../Models/medecinModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  
nom_conn: any;
prenom_conn: any;
email:any;
tel:any;
adr:any;
username:any;
FormGroup?: FormGroup;
FormGroup1?: FormGroup ;

constructor(private http: HttpClient,public sr:AuthService,private fb:FormBuilder) {}
    
  imageSrc: string | undefined;
  cin_conn:any;
  duree:any;
  limit:any;

  ngOnInit(): void {

    this.username=this.sr.username;
    
    // Initialisation du formulaire avec des valeurs par défaut
    this.FormGroup = this.fb.group({
        cin: ['', Validators.required],
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        tel: ['', Validators.required],
        email: ['', Validators.required],
        adr: ['', Validators.required],
      
    });
    this.FormGroup1 = this.fb.group({
      duree: ['', Validators.required],
      limit: ['', Validators.required],
    
    
  });
    // Récupération des informations et mise à jour du formulaire lorsque les données sont disponibles
    this.sr.getInfos().subscribe(data => {
        if (data !== undefined) {
            this.cin_conn = data.cin;
            this.nom_conn = data.nom;
            this.prenom_conn = data.prenom;
            this.tel = data.tel;
            this.adr = data.adr;
            this.email = data.email;
            
           
           if(this.FormGroup){
            this.FormGroup.patchValue({
                cin: this.cin_conn,
                nom: this.nom_conn,
                prenom: this.prenom_conn,
                tel: this.tel,
                email: this.email,
                adr: this.adr,
                duree:this.duree,
                limit:this.limit
               
            });
          }
            // Chargement de l'image
            this.getImage(this.cin_conn);
            this.sr.getLimitDuree(this.cin_conn).subscribe(data=>{
              this.duree=data.duree;
              this.limit=data.limit;console.log("duree hnaaaaaaa");
              console.log(this.duree);
        
                    if(this.FormGroup1){
                this.FormGroup1.patchValue({
                    duree: this.duree,
                    limit: this.limit,
                });
              }
            })
           
        } else {
            // Gérer le cas où data est undefined
        }
    });

}
onSubmit1() {
 
   this.sr.setLimitDuree(this.cin_conn,this.FormGroup1?.value).subscribe(data=>{
     this.sr.getLimitDuree(this.cin_conn);
   });
  }
  
onSubmit() {
  
  this.sr.updateInfos(this.cin_conn,this.FormGroup?.value).subscribe((response: any) => {
    console.log('update créé avec succès !');
    // Réinitialiser le formulaire ou effectuer d'autres actions après la création du rendez-vous
  },
  (error: any) => {
    console.error('Erreur lors de la création du rendez-vous :', error);
    // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
  }
 
  )};
  
  @ViewChild('fileInput') fileInput!: ElementRef;

  openFileInput() {
    const fileInput = this.fileInput.nativeElement as HTMLInputElement;
    fileInput.click(); // Ouvre le gestionnaire de fichiers lorsque l'utilisateur clique sur la div
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Appel de la méthode pour télécharger l'image
      this.uploadImage(formData);
    }
  }


  uploadImage(formData: FormData) {
    this.sr.uploadImage(this.cin_conn, formData).subscribe(
      (response: any) => {
        console.log('Image changée avec succès');
        // Mettre à jour l'image affichée après avoir changé l'image sur le serveur
        this.getImage(this.cin_conn);
      },
      (error) => {
        console.error('Erreur lors du changement d\'image :', error);
      }
    );
  }

getImage(cin: string) {
  this.http.get('http://localhost:8080/getImage/' + cin, { responseType: 'blob' }).subscribe(
    (data: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(data);
    },
    (error) => {
      console.error('Erreur lors de la récupération de l\'image :', error);
      // Gestion de l'erreur ici
    }
  );
}
}


