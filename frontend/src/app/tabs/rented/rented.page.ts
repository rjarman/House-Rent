import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { HouseOwnersData } from 'src/app/shared/houseOwnersData';
import { environment } from 'src/environments/environment';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-rented',
  templateUrl: './rented.page.html',
  styleUrls: ['./rented.page.scss'],
})
export class RentedPage implements OnInit {
  public userData: HouseOwnersData;
  public imageURL = environment.custom.IMAGE_URL;
  public isNotNull: boolean;

  constructor(private modalController: ModalController, private tabsService: TabsService) {
    this.tabsService.userData.subscribe(res => {
      if (Object.keys(res).length === 0) {
        this.isNotNull = false;
      } else {
        this.isNotNull = true;
        this.userData = res[0];
      }
    });
  }

  ngOnInit() {
  }

  async presentModal(sameOwnersData) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: sameOwnersData
    });
    return await modal.present();
  }

}
