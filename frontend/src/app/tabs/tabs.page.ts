import { Component, OnInit } from '@angular/core';
import { TabsService } from '../services/tabs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  userAuthData = {
    userName: '',
    email: '',
    image: '',
  };

  constructor(private tabsService: TabsService) {
    this.tabsService.getProfilePhoto.subscribe((res) => {
      this.userAuthData.userName = res.userName;
      this.userAuthData.email = res.email;
      this.userAuthData.image =
        environment.custom.PROFILE_IMAGE_URL + res.image;
    });
  }

  ngOnInit() {
    document
      .getElementById('menu-background')
      .style.setProperty('--background', 'url(../assets/cover/1.jpg)');
  }

  logout() {
    this.tabsService.logout();
  }

  refresh() {
    this.tabsService.refresh();
  }
}
