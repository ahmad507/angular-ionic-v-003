import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KendaraanPage } from './kendaraan.page';

describe('KendaraanPage', () => {
  let component: KendaraanPage;
  let fixture: ComponentFixture<KendaraanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KendaraanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
