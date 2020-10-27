import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OthersPageRoutingModule } from './others-routing.module';
import { OthersPage } from './others.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OthersPageRoutingModule],
  declarations: [OthersPage],
})
export class OthersPageModule {}
