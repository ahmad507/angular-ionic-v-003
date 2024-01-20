import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  tab_name: string = '' ;
  activeTab: boolean = false;
  // Icon For Tab Icon Active
  home: string = "assets/tabs-icon/home_a.svg";
  policy: string = "assets/tabs-icon/polis_a.svg";
  cart: string = "assets/tabs-icon/cart_a.svg";
  claim: string = "assets/tabs-icon/claim_a.svg";
  account: string = "assets/tabs-icon/account_a.svg";
  // Icon For Tab Icon Inactive
  home_i: string = "assets/tabs-icon/home_i.svg";
  policy_i: string = "assets/tabs-icon/polis_i.svg";
  cart_i: string = "assets/tabs-icon/cart_i.svg";
  claim_i: string = "assets/tabs-icon/claim_i.svg";
  account_i: string = "assets/tabs-icon/account_i.svg";

  constructor(

  ) { }


  ngOnInit() {

  }

  selectedTabs($event:any) {
    this.activeTab = !this.activeTab;
    this.tab_name = $event.tab;
  }

}
