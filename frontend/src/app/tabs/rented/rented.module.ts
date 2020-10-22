import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentedPageRoutingModule } from './rented-routing.module';

import { RentedPage } from './rented.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RentedPageRoutingModule],
  declarations: [RentedPage],
})
export class RentedPageModule {}
