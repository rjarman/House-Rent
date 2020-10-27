import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData, HouseOwnersData } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private userDataEmitter = new Subject<HouseOwnersData>();
  private allDataEmitter = new Subject<HouseOwnersData[]>();
  private userAuthDataEmitter = new Subject<AuthData>();

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {}

  private getAllData(): void {
    if (this.cookieService.get('email') !== '') {
      this.httpClient
        .post<{ status: string; data: HouseOwnersData[] }>(
          environment.custom.ALL_DATA_URL,
          { email: this.cookieService.get('email') },
          { observe: 'response' }
        )
        .subscribe((response) => {
          this.allDataEmitter.next(response.body.data);
        });
    }
  }
  private getLoggedData(): void {
    if (this.cookieService.get('email') !== '') {
      this.httpClient
        .post<{ status: string; data: HouseOwnersData }>(
          environment.custom.USER_DATA_URL,
          { email: this.cookieService.get('email') },
          { observe: 'response' }
        )
        .subscribe((response) => {
          this.userDataEmitter.next(response.body.data);
        });
    }
  }
  get userData(): Observable<HouseOwnersData> {
    this.getLoggedData();
    return this.userDataEmitter.asObservable();
  }
  get allData(): Observable<HouseOwnersData[]> {
    this.getAllData();
    return this.allDataEmitter.asObservable();
  }
  get getProfilePhoto(): Observable<AuthData> {
    this.httpClient
      .post<{ status: string; data: AuthData }>(
        environment.custom.USER_AUTH_DATA,
        { email: this.cookieService.get('email') },
        { observe: 'response' }
      )
      .subscribe((response) => {
        this.userAuthDataEmitter.next(response.body.data);
      });

    return this.userAuthDataEmitter.asObservable();
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
