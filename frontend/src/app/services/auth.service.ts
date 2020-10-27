import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../shared/types';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {}

  register(registerForm: any, profilePhoto: any) {
    const tempFormData = new FormData();
    const img = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < profilePhoto.length; i++) {
      img.push(profilePhoto[i].name);
      tempFormData.append('images', profilePhoto[i]);
      tempFormData.append('imagePath', JSON.stringify(img));
    }
    console.log(tempFormData);
    tempFormData.append(
      'userName',
      JSON.stringify(registerForm.get('userName').value)
    );
    tempFormData.append(
      'email',
      JSON.stringify(registerForm.get('email').value)
    );
    tempFormData.append(
      'password',
      JSON.stringify(registerForm.get('password').value)
    );
    this.httpClient
      .post<{ email; status }>(environment.custom.REGISTER_URL, tempFormData, {
        observe: 'response',
      })
      .subscribe((response) => {
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

  login(loginData: Login) {
    this.httpClient
      .post<{ email; status }>(environment.custom.LOGIN_URL, loginData, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.body.status === 'ok') {
          if (this.cookieService.check('email')) {
            this.cookieService.deleteAll();
          }
          this.cookieService.set(
            'email',
            response.body.email,
            30000,
            '',
            'localhost',
            false,
            'Strict'
          );
          this.cookieService.set(
            'isLoggedIn',
            'true',
            30000,
            '',
            'localhost',
            false,
            'Strict'
          );
          this.route.navigate(['/tabs']);
        } else {
          // toast
        }
      });
  }
}
