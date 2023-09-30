import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  imports:[CommonModule, FormsModule, IonicModule],
  selector: 'app-mv-model-brand',
  templateUrl: './mv-model-brand.component.html',
  styleUrls: ['./mv-model-brand.component.scss'],
})
export class MvModelBrandComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
