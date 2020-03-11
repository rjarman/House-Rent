import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentedPage } from './rented.page';

const routes: Routes = [
  {
    path: '',
    component: RentedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentedPageRoutingModule {}
