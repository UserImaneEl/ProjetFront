import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class limitRDVguard implements CanActivate {
  private actionPerformed: boolean = false;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.actionPerformed) {
      this.router.navigateByUrl("/listMed");
      return false; // Prevent navigation if action has not been performed
    }

    return new Observable<boolean>((observer) => {
      const cin = route.queryParams['cin'];
      this.http.post<number>('http://localhost:8083/nbrRDV', { cin: cin, username: this.authService.username, date_demande: new Date() })
        .subscribe(
          (response) => {
            if (response < 3) {
              observer.next(true); // Allow navigation
              console.log("tru");
            } else {
              observer.next(false); // Limit reached, prevent navigation
              console.log("false");
            }
            observer.complete();
          },
          (error) => {
            console.error('Error checking number of appointments:', error);
            observer.next(false); // Error occurred, prevent navigation
            observer.complete();
          }
        );
    });
  }

  performAction() {
    this.actionPerformed = true;
  }
}

