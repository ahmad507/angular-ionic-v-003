import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyPage } from './policy.page';

describe('PolicyPage', () => {
  let component: PolicyPage;
  let fixture: ComponentFixture<PolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
