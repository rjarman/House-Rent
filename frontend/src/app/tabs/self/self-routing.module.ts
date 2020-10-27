import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfPage } from './self.page';

const routes: Routes = [
  {
    path: '',
    component: SelfPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfPageRoutingModule {}
