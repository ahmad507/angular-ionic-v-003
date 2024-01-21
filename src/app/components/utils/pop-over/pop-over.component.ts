import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-pop-over',
  standalone: true,
  imports:[
    CommonModule,
    FormsModule,
    IonicModule
  ],
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
