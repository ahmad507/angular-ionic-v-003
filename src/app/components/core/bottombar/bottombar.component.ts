import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss'],
})
export class BottombarComponent  implements OnInit {
  public showTabs = true;
  @Input() inactive_route: any;
  @Input() active_route: any;
  @Input() route_name: any;
  @Input() route_tabs: any;
  @Input() name: any;
  constructor() { }

  toggleShow() {
    this.showTabs = !this.showTabs;
    this.name = this.showTabs ? 'active_route' : 'inactive_route';
  }

  ngOnInit() {}
}
