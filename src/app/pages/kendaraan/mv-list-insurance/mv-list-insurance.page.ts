import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectDataCoverageList} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {map, take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mv-list-insurance',
  templateUrl: './mv-list-insurance.page.html',
  styleUrls: ['./mv-list-insurance.page.scss'],
})
export class MvListInsurancePage implements OnInit {
  coveragesList: any = [];

  constructor(
    private store: Store,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.store.select(selectDataCoverageList).pipe(
      take(1),
      map((response: any) => response.mv_coverages_list)
    ).subscribe((response) => {
      this.coveragesList = response
      console.log('Dari Halaman List', this.coveragesList);
    })
  }

  async gotoMvPage() {
    await this.router.navigate(['/kendaraan'])
  }
}
