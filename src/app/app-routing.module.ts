import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'kendaraan',
    loadChildren: () => import('./pages/kendaraan/kendaraan.module').then(m => m.KendaraanPageModule)
  },
  {
    path: 'mv-list-insurance',
    loadChildren: () => import('./pages/kendaraan/mv-list-insurance/mv-list-insurance.module').then(m => m.MvListInsurancePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
