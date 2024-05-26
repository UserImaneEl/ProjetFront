import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import { Observable, of } from 'rxjs';
import { rdv } from '../Models/rdv';
import { CalendarEvent } from 'angular-calendar';
import { note } from '../Models/note';
import { patient } from '../Models/patient';
import { medecin, rendezvous } from '../Models/medecinModel';
import { rdvConsult } from '../Models/rdvConsult';
import { consultation } from '../Models/consultation';
import { personne } from '../Models/personne';
import { Departement } from '../Models/AjoutMed';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient, private router: Router) { }
  //window :undefined;
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: any;

  public login(username: string, password: string) {
    let body = new HttpParams()
      .set("username", username)
      .set("password", password)
      .set("grant_type", "password");

    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),
    };

    return this.http.post("http://localhost:8080/auth/Login", body.toString(), options);
  }


 loadProfile(data: any) :Observable<any>{
   this.isAuthenticated=true;
   this.accessToken =data['access-token'];
   let decodedJwt:any = jwtDecode(this.accessToken);
   //extract the role and userbame from Jwt
   this.roles=decodedJwt.scope
   this.username=decodedJwt.sub;
   //store Jwt in Local Storage
   localStorage.setItem("jwt-token",this.accessToken);
   return of(this.roles); 
 }

 loadTokenFromStorage() {
   let token = localStorage.getItem("jwt-token");
   if(token){
     this.loadProfile({"access-token":token});
   //une fois on charge le token on va aller a cette route bch ila khraj/actualisa yrjaa nichn l page li deja kan fiha
     //d accueil si mknch deconnecta o token baqi matexpirach
     //this.router.navigateByUrl("/admin/");
   }
 }

  Logout() {
      this.isAuthenticated=false;
      this.accessToken=undefined;
      this.username=undefined;
      this.roles=undefined;
      this.router.navigateByUrl("/login");
      //window.localStorage.removeItem("access-token");
      localStorage.removeItem("jwt-token");


  }
  fetch():Observable<any[]>{
   return this.http.get<any[]>('http://localhost:8080/SEC/RdvBySec/' + this.username)
  }
  availableDate(cinMed:string):Observable<any>{
    return this.http.get<any>('http://localhost:8080/appointments/proposed-time/' + cinMed);
  }


  validerRdv(idRdv: any, rdv:rdv): Observable<any> {
   
  
    return this.http.post<any>('http://localhost:8080/valider/' + idRdv, rdv);
  }
 
  countDem(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/demandes/count/'+this.username);
  }
  
  readonly API_URL = 'http://localhost:8080';
  readonly ENDPOINT_RDV = "/rendez-vous";
  
 

  getRDV(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.API_URL + this.ENDPOINT_RDV);
  }
  getNotes(cin:string,date:String):Observable<note[]>{
    return this.http.get<note[]>(this.API_URL + "/notes/"+cin+"/"+date);
  }
  saveNewNote(note:note):Observable<void> {
    return  this.http.post<void>(this.API_URL + "/notes",note);
  }
  deleteNote(id:number):Observable<void>{
       return  this.http.delete<void>(this.API_URL + "/notes/"+id);
  }
  UpdateNote(id:number,title:string):Observable<void>{
    return  this.http.put<void>(this.API_URL + "/notes/"+id,title);
}

countRDVreporte():Observable<any>{
  const sec=this.username;
  return this.http.get<any>(this.API_URL + "/rendez-vous/reporte/"+sec);
}
countMed():Observable<any>{
return this.http.get<any>(this.API_URL + "/countMed/"+this.username);
}
countToday():Observable<any>{
  return this.http.get<any>(this.API_URL + "/countToday/"+this.username);

}
ajouterRDV(p:patient) {
  return this.http.post<any>(this.API_URL + "/ajouterRdv", p);
}
fetchMedecins():Observable<any> {
  return this.http.get<any>(this.API_URL + "/listMedecins/"+this.username);
}
getMedByUsername():Observable<any>{
  return this.http.get<any>(this.API_URL + "/medByUsername/"+this.username);
}
getPatientDetails(idRdv:any):Observable<any> {
  return this.http.get<any>(this.API_URL+"/details/"+idRdv);
}
getRdvDetails(id:string):Observable<rdvConsult[]> {
  return this.http.get<rdvConsult[]>(this.API_URL+"/rendezVous/"+id);
}

createConsultation(consultation: consultation): Observable<any> {
  return this.http.post(this.API_URL+"/consult",consultation);
}
getInfos():Observable<any>{
  return this.http.get<any>(this.API_URL + "/infos/"+this.username);
}
getPatientRdvOfMed(cin_med:any){
  return this.http.get<any>(this.API_URL + "/rendez-vous/"+cin_med);
}
countRdvOfMedByDay():Observable<any>{
 return this.http.get<any>(this.API_URL + "/countWhenMed/"+this.username);
}
getBlob(cin:any):Observable<any>{
  return this.http.get<any>(this.API_URL + "/getImage/"+cin);
}
uploadImage(cin:any,file:any):Observable<any>{
  return this.http.post<any>(this.API_URL + "/uploadImage/"+cin,file);
}
updateInfos(cin:any,per:personne):Observable<any>{
  return this.http.post<any>(this.API_URL + "/updateInfos/"+cin,per);
}
setLimitDuree(cin:any,med:medecin):Observable<any>{
  return this.http.post<any>(this.API_URL + "/setLimitDuree/"+cin,med);
}
getLimitDuree(cin:any):Observable<any>{
  return this.http.get<any>(this.API_URL + "/getLimitDuree/"+cin);
}
fetchMedecinsAdmin():Observable<any> {
  return this.http.get<any>(this.API_URL + "/listMedecinsAdmin");
}
getDep() :Observable<Departement[]> {
  return this.http.get<Departement[]>(this.API_URL+"/dep");
}
checkDuplicateUsername(username: string): Observable<boolean> {
  // Utilisez HttpClient pour envoyer une requête HTTP à votre backend
  // Endpoint pour vérifier si le nom d'utilisateur existe déjà
  // Adapté à votre propre implémentation de l'API backend
  return this.http.get<boolean>(this.API_URL +"/exists/"+username);
}
checkDuplicateCin(cin: string): Observable<boolean> {
  // Utilisez HttpClient pour envoyer une requête HTTP à votre backend
  // Endpoint pour vérifier si le nom d'utilisateur existe déjà
  // Adapté à votre propre implémentation de l'API backend/existsCin/{cin}
  return this.http.get<boolean>(this.API_URL +"/existsCin/"+cin);
}
}



