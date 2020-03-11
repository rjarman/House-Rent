import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfPageRoutingModule } from './self-routing.module';

import { SelfPage } from './self.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfPageRoutingModule
  ],
  declarations: [SelfPage]
})
export class SelfPageModule {}
