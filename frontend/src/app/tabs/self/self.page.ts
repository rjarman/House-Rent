import { Component, OnInit } from '@angular/core';
import { HouseOwnersData } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
import { TabsService } from 'src/app/services/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self',
  templateUrl: './self.page.html',
  styleUrls: ['./self.page.scss'],
})
export class SelfPage implements OnInit {
  public userData: HouseOwnersData;
  public imageURL = environment.custom.IMAGE_URL;
  public isNotNull: boolean;

  constructor(private tabsService: TabsService, private route: Router) {
    this.tabsService.userData.subscribe((res) => {
      if (Object.keys(res).length === 0) {
        this.isNotNull = false;
      } else {
        this.isNotNull = true;
        this.userData = res[0];
      }
    });
  }

  ngOnInit() {}

  onClick(sameOwnersData) {
    this.route.navigate(['tabs/add', JSON.stringify(sameOwnersData)]);
  }
}
