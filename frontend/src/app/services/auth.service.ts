import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../shared/login';
import { Register } from '../shared/register';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService, private route: Router) {}

  public register(registerForm: any, profilePhoto: any) {

    const tempFormData = new FormData();
    const img = [];
    for (let i = 0; i < profilePhoto.length; i++) {
      img.push(profilePhoto[i].name);
      tempFormData.append('images', profilePhoto[i]);
      tempFormData.append('imagePath', JSON.stringify(img));
    }
    console.log(tempFormData);
    tempFormData.append('userName', JSON.stringify(registerForm.get('userName').value));
    tempFormData.append('email', JSON.stringify(registerForm.get('email').value));
    tempFormData.append('password', JSON.stringify(registerForm.get('password').value));
    // console.log(tempFormData);
    this.httpClient.post<{email, status}>(environment.custom.REGISTER_URL, tempFormData, {observe: 'response'}).subscribe(response => {
      if (response.body.status === 'ok') {
        if (this.cookieService.check('email')) {
          this.cookieService.deleteAll();
        }
        this.cookieService.set('email', response.body.email);
        this.cookieService.set('isLoggedIn', 'true');
        this.route.navigate(['/tabs']);
      } else {
        // toast
      }
    });
  }

  public addUserFormToDatabase() {
  }
  public login(loginData: Login) {
    this.httpClient.post<{email, status}>(environment.custom.LOGIN_URL, loginData, {observe: 'response'}).subscribe(response => {
      console.log(response.body.email);
      if (response.body.status === 'ok') {
        if (this.cookieService.check('email')) {
          this.cookieService.deleteAll();
        }
        this.cookieService.set('email', response.body.email);
        this.cookieService.set('isLoggedIn', 'true');
        this.route.navigate(['/tabs']);
      } else {
        // toast
      }
    });
  }
}
