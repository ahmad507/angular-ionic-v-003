import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MvListInsurancePage} from './mv-list-insurance.page';
import {async} from "rxjs";

describe('MvListInsurancePage', () => {
  let component: MvListInsurancePage;
  let fixture: ComponentFixture<MvListInsurancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MvListInsurancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
