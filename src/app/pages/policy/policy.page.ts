import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyPage implements OnInit {
  model1: any = '';
  model2: any = '';

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

  }
}
