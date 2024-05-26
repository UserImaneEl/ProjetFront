import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  
  /*imageSrc: string | undefined;

  constructor(private http: HttpClient) {}

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
  }*/
  
}
