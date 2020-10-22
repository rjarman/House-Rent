import { Component, OnInit } from '@angular/core';
import { TabsService } from 'src/app/services/tabs.service';
import { HouseOwnersData } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {
  public allData: HouseOwnersData[];
  public imageURL = environment.custom.IMAGE_URL;

  constructor(
    private tabsService: TabsService,
    private modalController: ModalController
  ) {
    this.tabsService.allData.subscribe((res) => {
      this.allData = res;
    });
  }

  ngOnInit() {}

  async presentModal(sameOwnersData) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: sameOwnersData,
    });
    return await modal.present();
  }
}
