import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private route: Router, private cookieService: CookieService) {

  }
  canLoad(route: import('@angular/router').Route,
          segments: import('@angular/router').UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    if (this.cookieService.get('isLoggedIn') === 'true') {
      return true;
    } else {
      this.route.navigate(['/auth']);
    }
  }
}
