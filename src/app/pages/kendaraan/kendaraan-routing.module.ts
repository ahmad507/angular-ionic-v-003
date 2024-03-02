import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {KendaraanPage} from './kendaraan.page';

const routes: Routes = [
  {
    path: '',
    component: KendaraanPage
  },
  {
    path: 'mv-list-insurance',
    loadChildren: () => import('./mv-list-insurance/mv-list-insurance.module').then(m => m.MvListInsurancePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KendaraanPageRoutingModule {}
