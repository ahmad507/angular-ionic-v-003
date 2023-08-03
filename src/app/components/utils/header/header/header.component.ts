import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  // @ViewChild(IonHeader) IonHeader
  constructor() { }

  ngOnInit() {}

}
