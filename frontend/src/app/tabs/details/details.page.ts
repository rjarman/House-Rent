import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  isEmptyMobile2 = false;
  imagePath = environment.custom.IMAGE_URL;

  ownerDetails = {
    personal: {
      ownerName: '',
      mobile1: '',
      mobile2: '',
    },
    details: {
      imagePath: [''],
      houseInfo: {
        emptyRoom: '',
        roomDetails: '',
        price: '',
      },
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      renterInfo: {
        isChecked: true,
        renterInfo: {
          name: '',
          mobile: '',
          officeAddress: '',
          permanentAddress: '',
        },
      },
    },
  };

  constructor(
    private modalControl: ModalController,
    private navParams: NavParams
  ) {
    this.ownerDetails.personal.ownerName = this.navParams.data.personal.ownerName;
    this.ownerDetails.personal.mobile1 = this.navParams.data.personal.mobile1;
    this.ownerDetails.personal.mobile2 = this.navParams.data.personal.mobile2;

    this.ownerDetails.details.imagePath = this.navParams.data.details.imagePath;
    this.ownerDetails.details.houseInfo.emptyRoom = this.navParams.data.details.houseInfo.emptyRoom;
    this.ownerDetails.details.houseInfo.roomDetails = this.navParams.data.details.houseInfo.roomDetails;
    this.ownerDetails.details.houseInfo.price = this.navParams.data.details.houseInfo.price;
    this.ownerDetails.details.address.street = this.navParams.data.details.address.street;
    this.ownerDetails.details.address.city = this.navParams.data.details.address.city;
    this.ownerDetails.details.address.state = this.navParams.data.details.address.state;
    this.ownerDetails.details.address.zip = this.navParams.data.details.address.zip;

    this.ownerDetails.details.renterInfo.isChecked = this.navParams.data.details.renterInfo.isChecked;
    this.ownerDetails.details.renterInfo.renterInfo.name = this.navParams.data.details.renterInfo.renterInfo.name;
    this.ownerDetails.details.renterInfo.renterInfo.mobile = this.navParams.data.details.renterInfo.renterInfo.mobile;
    this.ownerDetails.details.renterInfo.renterInfo.officeAddress = this.navParams.data.details.renterInfo.renterInfo.officeAddress;
    this.ownerDetails.details.renterInfo.renterInfo.permanentAddress = this.navParams.data.details.renterInfo.renterInfo.permanentAddress;

    if (this.ownerDetails.personal.mobile2 !== '') {
      this.isEmptyMobile2 = true;
    }
  }

  dismissModal() {
    this.modalControl.dismiss({
      dismissed: true,
    });
  }
}
