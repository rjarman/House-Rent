import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'self',
        loadChildren: () => import('./self/self.module').then( m => m.SelfPageModule)
      },
      {
        path: 'others',
        loadChildren: () => import('./others/others.module').then( m => m.OthersPageModule)
      },
      {
        path: 'rented',
        loadChildren: () => import('./rented/rented.module').then( m => m.RentedPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/self',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'add/:sameOwnersData',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'add',
    children: [
      {
        path: '',
        loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
