import { Component, OnInit } from '@angular/core';
import { TabsService } from '../services/tabs.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public userAuthData = {
    userName: '',
    email: '',
    image: ''
  };
  // public PROFILE_IMAGE_URL = environment.custom.PROFILE_IMAGE_URL;

  constructor(private tabsService: TabsService, private platform: Platform) {
    this.tabsService.getProfilePhoto.subscribe(res => {
      this.userAuthData.userName = res.userName;
      this.userAuthData.email = res.email;
      this.userAuthData.image = environment.custom.PROFILE_IMAGE_URL + res.image;
    });
    // console.log(this.userAuthData)
    // console.log(this.PROFILE_IMAGE_URL + this.userAuthData.image);
   }

  ngOnInit() {
    document.getElementById('menu-background').style.setProperty(
      '--background',
      'url(../assets/cover/1.jpg)'
      );
  }

  logout() {
    this.tabsService.logout();
  }

  refresh() {
    this.tabsService.refresh();
    // this.tabsService.userData.subscribe(res => {
    //     this.userData = res;
    //   });

    // console.log(this.userData);
  }

}
