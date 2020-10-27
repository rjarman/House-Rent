import { Component } from '@angular/core';
import { HouseOwnersData } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { ServerService } from 'src/app/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self',
  templateUrl: './self.page.html',
  styleUrls: ['./self.page.scss'],
})
export class SelfPage {
  userData: HouseOwnersData;
  imageURL = environment.custom.IMAGE_URL;
  isNotNull: boolean;

  constructor(private tabsService: ServerService, private route: Router) {
    this.tabsService.userData.subscribe((res) => {
      if (Object.keys(res).length === 0) {
        this.isNotNull = false;
      } else {
        this.isNotNull = true;
        this.userData = res[0];
      }
    });
  }

  onClick(sameOwnersData) {
    this.route.navigate(['tabs/add', JSON.stringify(sameOwnersData)]);
  }
}
