import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private imageArray;
  private addForm;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {}

  public addUserFormToDatabase() {
    const tempFormData = new FormData();
    const img = [];
    for (let i = 0; i < this.imageArray.length; i++) {
      img.push(this.imageArray[i].name);
      tempFormData.append('images', this.imageArray[i]);
      tempFormData.append('imagePath', JSON.stringify(img));
    }
    tempFormData.append(
      'ownerInfo',
      JSON.stringify(this.addForm.get('ownerInfo').value)
    );
    tempFormData.append(
      'houseInfo',
      JSON.stringify(this.addForm.get('houseInfo').value)
    );
    tempFormData.append(
      'address',
      JSON.stringify(this.addForm.get('address').value)
    );
    tempFormData.append(
      'isChecked',
      JSON.stringify(this.addForm.get('isChecked').value)
    );
    tempFormData.append(
      'renterInfo',
      JSON.stringify(this.addForm.get('renterInfo').value)
    );
    tempFormData.append(
      'email',
      JSON.stringify(this.cookieService.get('email'))
    );

    this.httpClient
      .post<{ status: string }>(
        environment.custom.ADD_USER_DATA,
        tempFormData,
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response.body.status === 'ok') {
          // tost
          this.route.navigate(['/tabs']);
        }
      });
  }

  public updateUserFormToDatabase() {
    const tempFormData = new FormData();
    const img = [];
    for (let i = 0; i < this.imageArray.length; i++) {
      img.push(this.imageArray[i].name);
      tempFormData.append('images', this.imageArray[i]);
      tempFormData.append('imagePath', JSON.stringify(img));
    }
    tempFormData.append(
      'ownerInfo',
      JSON.stringify(this.addForm.get('ownerInfo').value)
    );
    tempFormData.append(
      'houseInfo',
      JSON.stringify(this.addForm.get('houseInfo').value)
    );
    tempFormData.append(
      'address',
      JSON.stringify(this.addForm.get('address').value)
    );
    tempFormData.append(
      'isChecked',
      JSON.stringify(this.addForm.get('isChecked').value)
    );
    tempFormData.append(
      'renterInfo',
      JSON.stringify(this.addForm.get('renterInfo').value)
    );
    tempFormData.append(
      'email',
      JSON.stringify(this.cookieService.get('email'))
    );
    tempFormData.append('tempOldData', localStorage.getItem('tempOldData'));

    this.httpClient
      .post<{ status: string }>(
        environment.custom.UPDATE_USER_DATA,
        tempFormData,
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response.body.status === 'ok') {
          // tost
          this.route.navigate(['/tabs']);
        }
      });
  }

  set addImage(imageArray) {
    this.imageArray = imageArray;
  }

  set addOtherData(addForm) {
    this.addForm = addForm;
  }
}
