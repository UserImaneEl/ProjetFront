import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { DemandeRdv } from '../../Models/medecinModel';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrl: './liste-rdv.component.css'
})
export class ListeRDVComponent implements OnInit {
  myForm!: FormGroup;
  doctorCin: string = ''; // Declare doctorCin at the class level

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private http: HttpClient,
              private router :Router,
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.route.queryParams.subscribe(params => {
      this.doctorCin = params['cin']; // Assign value to class-level variable
    });
  }

  onSubmit() {
    const formValue = this.myForm.value;
    const demandeRdv: DemandeRdv = {
      statusRDV: 0,
      Patientcin: formValue.cin,
      DRcin: this.doctorCin,
      username: this.authService.username,
      date_demande: new Date(),
      nom: formValue.nom,
      prenom: formValue.prenom,
      tel: formValue.tel,
      email: formValue.email,
      adresse: '',
    };
      this.http.post<any>('http://localhost:8080/priseRdvNewPatient', demandeRdv)
        .subscribe(
          (response) => {
            console.log('Response from server:', response);
            alert(response.message); // Display the message to the user
            this.router.navigateByUrl("/patientRDV");
          },
          (error) => {
            console.error('Error creating appointment:', error);
            alert('Error creating appointment. Please try again later.');
          }
        );
    }


  }
