import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HouseOwnersData } from '../shared/houseOwnersData';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData } from '../shared/authData';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  private _userdata = new Subject<HouseOwnersData>();
  private _allData = new Subject<HouseOwnersData[]>();
  private userAuthData = new Subject<AuthData>();

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private route: Router) {
  }

  private getAllData(): void {
    if (this.cookieService.get('email') !== '') {
      this.httpClient.post<{status: string, data: HouseOwnersData[]}>(environment.custom.ALL_DATA_URL,
        {email: this.cookieService.get('email')}, {observe: 'response'}).subscribe(response => {
          this._allData.next(response.body.data);
        });
    }
  }
  private getLoggedData(): void {
    if (this.cookieService.get('email') !== '') {
      this.httpClient.post<{status: string, data: HouseOwnersData}>(environment.custom.USER_DATA_URL,
        {email: this.cookieService.get('email')}, {observe: 'response'}).subscribe(response => {
            this._userdata.next(response.body.data);
        });
    }
  }
  get userData(): Observable<HouseOwnersData> {
    this.getLoggedData();
    return this._userdata.asObservable();
  }
  get allData(): Observable<HouseOwnersData[]> {
    this.getAllData();
    return this._allData.asObservable();
  }
  get getProfilePhoto(): Observable<AuthData> {
    this.httpClient.post<{status: string, data: AuthData}>(environment.custom.USER_AUTH_DATA, {email: this.cookieService.get('email')},
      {observe: 'response'}).subscribe(response => {
        this.userAuthData.next(response.body.data);
      });

    return this.userAuthData.asObservable();
  }

  refresh() {
    this.getAllData();
    this.getLoggedData();
  }

  logout() {
    this.cookieService.delete('isLoggedIn');
    this.cookieService.delete('email');
    this.route.navigate(['/auth']);
  }
}
