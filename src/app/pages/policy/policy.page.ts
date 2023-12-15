import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

export type MvListYear = ListYear[]

export interface ListYear {
  id: number;
  text: number;
}


@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
  focused: boolean = false;
  searchParam: string = '';
  listMvYear: MvListYear = [];
  filteredList: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.callApiForMvYear();
    this.filter();
  }

  private callApiForMvYear() {
    let dateNow = new Date();
    let yearNow = dateNow.getFullYear();
    let arrData = [];
    for(let i = yearNow; i >= (yearNow - 15); i--){
      arrData.push({id:i, text:i});
    }
    this.listMvYear = arrData;
  }

  onBlur(event: any){
    const value = event.target.value;
    if(!value){
      this.focused = false;
    }
  }

  filter() {
    this.filteredList = this.listMvYear.filter((item) => item.text.toString().toLowerCase().includes(this.searchParam.toLowerCase()));
    console.log(this.filteredList);
  }
}
