import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MvInsurancePeriodComponent} from './mv-insurance-period.component';

describe('MvInsurancePeriodComponent', () => {
  let component: MvInsurancePeriodComponent;
  let fixture: ComponentFixture<MvInsurancePeriodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MvInsurancePeriodComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MvInsurancePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
