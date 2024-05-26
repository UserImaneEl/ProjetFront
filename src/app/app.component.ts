import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'projetHopitalFront';
  constructor(private authService : AuthService) {
  }
  //au demarrage on charge le token from local storage si il existe
  ngOnInit() {
  this.authService.loadTokenFromStorage();
  }
}
