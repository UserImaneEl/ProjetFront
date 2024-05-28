import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  //The ! indicates that this property will be initialized before use,
  // even though it is initially declared as undefined
  formLogin! : FormGroup ;
//FormBuilder (used to create the form),
// AuthService (presumably used for authentication),
// and Router (used for navigation).
  constructor(private fb: FormBuilder, private authService: AuthService,private router : Router) {
  }
//this.fb.group({ ... }): This method creates a FormGroup instance with the specified form controls.
// In this case, the form has two controls: username and password,
// both initially set to empty strings.
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")

    })
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;

    let role:any;
    this.authService.login(username, pwd).subscribe({
      next: data => {
      this.authService.loadProfile(data).subscribe(data=>{
         role=data;
      });
      console.log(role);
      if(role=='ROLE_SECRETAIRE'){
        this.router.navigateByUrl("SEC");
      }
      else if(role=='ROLE_MEDECIN'){
        this.router.navigateByUrl("consult");

      }
      else if(role=='ROLE_ADMIN'){
        this.router.navigateByUrl("adminMed");
      }
   
      },

      error: err => {
        console.log(err);
      }
    })
  }
}
