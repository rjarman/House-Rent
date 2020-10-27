import { Component } from '@angular/core';
import { ServerService } from 'src/app/server.service';
import { HouseOwnersData } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage {
  allData: HouseOwnersData[];
  imageURL = environment.custom.IMAGE_URL;

  constructor(
    private tabsService: ServerService,
    private modalController: ModalController
  ) {
    this.tabsService.allData.subscribe((res) => {
      this.allData = res;
    });
  }

  async presentModal(sameOwnersData) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: sameOwnersData,
    });
    return await modal.present();
  }
}
