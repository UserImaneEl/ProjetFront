import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrl: './card-box.component.css'
})
export class CardBoxComponent implements OnInit{
  nbr:any;
  nbrRepotre:any;
  nbrMed:any;
  nbrToday:any;
  ngOnInit(): void {
    this.count();
    this.countReporte();
    this.countMed(); 
  this.countToday(); }
  constructor(private rendezVousService: AuthService) { }
  count() {
    console.log('Calling count() method...');
    this.rendezVousService.countDem().subscribe(data => {
      console.log('Data received:', data);
      this.nbr = data;
    }, error => {
      console.error('Error fetching data:', error);
});


  }
  countReporte(){
    console.log('Calling count() method...');
  this.rendezVousService.countRDVreporte().subscribe(data => {
    console.log('Data received:', data);
    this.nbrRepotre = data;
  }, error => {
    console.error('Error fetching data:', error);
});
  }
  countMed(){
  this.rendezVousService.countMed().subscribe(data => {
    this.nbrMed = data;
  }, error => {
    console.error('Error fetching data:', error);
});
  }
  countToday(){
    this.rendezVousService.countToday().subscribe(data => {
      this.nbrToday= data;
      console.log("iciiiiiiiiii");
    console.log(this.nbrToday);
    }, error => {
      console.error('Error fetching data:', error);
  });
    }
}

