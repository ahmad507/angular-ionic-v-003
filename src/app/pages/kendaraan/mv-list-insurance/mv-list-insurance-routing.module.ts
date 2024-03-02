import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MvListInsurancePage} from './mv-list-insurance.page';

const routes: Routes = [
  {
    path: '',
    component: MvListInsurancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MvListInsurancePageRoutingModule {
}
