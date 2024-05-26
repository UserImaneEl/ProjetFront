import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-medecin-template',
  templateUrl: './medecin-template.component.html',
  styleUrl: './medecin-template.component.css'
})
export class MedecinTemplateComponent implements OnInit{
  cin_med:any;
   constructor(private sr:AuthService){
   
   }
  ngOnInit(): void {
    this.sr.getMedByUsername().subscribe(
      data => {
        this.cin_med = data.cin;
        console.log(this.cin_med);
      }
    );
  }

}
